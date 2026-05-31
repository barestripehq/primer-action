import * as fs from 'fs';
import * as os from 'os';

// ---------------------------------------------------------------------------
// Asset name
// ---------------------------------------------------------------------------

export function assetName(
  platform: NodeJS.Platform = os.platform(),
  arch: string = os.arch(),
): string {
  if (platform === 'linux') {
    return arch === 'arm64'
      ? 'primer-aarch64-unknown-linux-gnu.tar.xz'
      : 'primer-x86_64-unknown-linux-gnu.tar.xz';
  }
  if (platform === 'darwin') {
    return arch === 'arm64'
      ? 'primer-aarch64-apple-darwin.tar.xz'
      : 'primer-x86_64-apple-darwin.tar.xz';
  }
  if (platform === 'win32') {
    return 'primer-x86_64-pc-windows-msvc.zip';
  }
  throw new Error(`Unsupported platform: ${platform}/${arch}`);
}

// ---------------------------------------------------------------------------
// PR comment body
// ---------------------------------------------------------------------------

export const COMMENT_MARKER = '<!-- primer-action-comment -->';

export function buildCommentBody(file: string, sarifPath: string): string {
  if (!fs.existsSync(sarifPath)) {
    return `${COMMENT_MARKER}\n### primer scan — ${file}\n\nNo findings.`;
  }

  const sarif = JSON.parse(fs.readFileSync(sarifPath, 'utf8'));
  const results: Array<{ ruleId: string; level: string; message: { text: string } }> =
    sarif?.runs?.[0]?.results ?? [];

  if (results.length === 0) {
    return `${COMMENT_MARKER}\n### primer scan — \`${file}\`\n\n✅ No vulnerabilities found.`;
  }

  const rows = results
    .map(r => {
      const level = r.level === 'error' ? '🔴' : r.level === 'warning' ? '🟡' : '🔵';
      return `| ${level} | \`${r.ruleId}\` | ${r.message.text} |`;
    })
    .join('\n');

  return [
    COMMENT_MARKER,
    `### primer scan — \`${file}\``,
    '',
    `| Severity | ID | Description |`,
    `|----------|-----|-------------|`,
    rows,
    '',
    `> Run \`primer scan --file ${file}\` locally for full details and fix commands.`,
  ].join('\n');
}
