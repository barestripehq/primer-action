import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as github from '@actions/github';
import * as http from '@actions/http-client';
import * as tc from '@actions/tool-cache';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as zlib from 'zlib';
import { assetName, buildCommentBody, COMMENT_MARKER } from './utils';

// ---------------------------------------------------------------------------
// Binary download
// ---------------------------------------------------------------------------

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
}

interface Release {
  tag_name: string;
  assets: ReleaseAsset[];
}

async function fetchRelease(version: string): Promise<Release> {
  const client = new http.HttpClient('primer-action');
  const url =
    version === 'latest'
      ? 'https://api.github.com/repos/barestripehq/primer/releases/latest'
      : `https://api.github.com/repos/barestripehq/primer/releases/tags/${version}`;

  const res = await client.get(url, { Accept: 'application/vnd.github+json' });
  if (res.message.statusCode !== 200) {
    throw new Error(`Failed to fetch release ${version}: HTTP ${res.message.statusCode}`);
  }
  return JSON.parse(await res.readBody()) as Release;
}

async function installPrimer(version: string): Promise<string> {
  const target = assetName();
  const release = await fetchRelease(version);
  const resolvedVersion = release.tag_name;

  const isZip = target.endsWith('.zip');
  const binaryName = os.platform() === 'win32' ? 'primer.exe' : 'primer';

  // Return cached binary if available.
  const cached = tc.find('primer', resolvedVersion);
  if (cached) {
    core.info(`primer ${resolvedVersion} restored from cache`);
    return path.join(cached, binaryName);
  }

  const asset = release.assets.find(a => a.name === target);
  if (!asset) {
    throw new Error(`No asset named '${target}' in release ${resolvedVersion}`);
  }

  core.info(`Downloading primer ${resolvedVersion} (${target})`);
  const downloaded = await tc.downloadTool(asset.browser_download_url);
  const extracted = isZip
    ? await tc.extractZip(downloaded)
    : await tc.extractTar(downloaded, undefined, ['xJ']);
  const cachedDir = await tc.cacheDir(extracted, 'primer', resolvedVersion);

  return path.join(cachedDir, binaryName);
}

// ---------------------------------------------------------------------------
// Scan
// ---------------------------------------------------------------------------

const SARIF_FILE = 'primer-results.sarif';

async function runScan(binaryPath: string, file: string, threshold: string): Promise<number> {
  let exitCode = 0;
  try {
    exitCode = await exec.exec(
      binaryPath,
      ['scan', '--file', file, '--format', 'sarif', '--output', SARIF_FILE],
      {
        env: {
          ...process.env,
          PRIMER_CI_MODE: threshold === 'none' ? 'allow-all' : '',
        },
        ignoreReturnCode: true,
      }
    );
  } catch (err) {
    throw new Error(`Failed to run primer scan: ${err}`);
  }
  return exitCode;
}

// ---------------------------------------------------------------------------
// SARIF upload
// ---------------------------------------------------------------------------

async function uploadSarif(token: string): Promise<void> {
  if (!fs.existsSync(SARIF_FILE)) {
    core.warning('No SARIF file found — skipping upload');
    return;
  }

  const { owner, repo } = github.context.repo;
  const commitSha = github.context.sha;
  const ref = github.context.ref;

  const sarifContent = fs.readFileSync(SARIF_FILE);
  const compressed = zlib.gzipSync(sarifContent);
  const encoded = compressed.toString('base64');

  const octokit = github.getOctokit(token);
  await octokit.request('POST /repos/{owner}/{repo}/code-scanning/sarifs', {
    owner,
    repo,
    commit_sha: commitSha,
    ref,
    sarif: encoded,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  core.info('SARIF uploaded to GitHub Security tab');
}

// ---------------------------------------------------------------------------
// PR comment
// ---------------------------------------------------------------------------

async function postPrComment(token: string, file: string): Promise<void> {
  const context = github.context;
  if (!context.payload.pull_request) return;

  const { owner, repo } = context.repo;
  const issueNumber = context.payload.pull_request.number;
  const octokit = github.getOctokit(token);

  const { data: comments } = await octokit.rest.issues.listComments({
    owner,
    repo,
    issue_number: issueNumber,
  });

  const body = buildCommentBody(file, SARIF_FILE);
  const existing = comments.find((c: { body?: string | null }) => c.body?.includes(COMMENT_MARKER));

  if (existing) {
    await octokit.rest.issues.updateComment({ owner, repo, comment_id: existing.id, body });
    core.info('Updated existing PR comment');
  } else {
    await octokit.rest.issues.createComment({ owner, repo, issue_number: issueNumber, body });
    core.info('Posted PR comment');
  }
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function run(): Promise<void> {
  try {
    const file = core.getInput('file', { required: true });
    const threshold = core.getInput('threshold');
    const doUploadSarif = core.getInput('upload-sarif') === 'true';
    const doCommentPr = core.getInput('comment-pr') === 'true';
    const failOnFindings = core.getInput('fail-on-findings') === 'true';
    const primerVersion = core.getInput('primer-version');
    const token = core.getInput('token');

    // Install primer binary.
    const binaryPath = await installPrimer(primerVersion);
    core.info(`Using primer at ${binaryPath}`);

    // Run scan.
    const scanExitCode = await runScan(binaryPath, file, threshold);

    // Set outputs from SARIF.
    if (fs.existsSync(SARIF_FILE)) {
      const sarif = JSON.parse(fs.readFileSync(SARIF_FILE, 'utf8'));
      const results: Array<{ level: string }> = sarif?.runs?.[0]?.results ?? [];
      const blockingCount = results.filter(r => r.level === 'error').length;
      core.setOutput('findings-count', results.length.toString());
      core.setOutput('blocking-count', blockingCount.toString());
      core.setOutput('sarif-path', path.resolve(SARIF_FILE));
    }

    // Upload SARIF.
    if (doUploadSarif) {
      await uploadSarif(token);
    }

    // Post PR comment.
    if (doCommentPr) {
      await postPrComment(token, file);
    }

    // Propagate primer's exit code.
    if (failOnFindings && scanExitCode !== 0) {
      core.setFailed(`primer found blocking vulnerabilities in ${file}`);
    }
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error));
  }
}

run();
