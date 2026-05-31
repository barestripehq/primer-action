import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { describe, it, expect } from 'vitest';
import { assetName, buildCommentBody, COMMENT_MARKER } from './utils';

// ---------------------------------------------------------------------------
// assetName
// ---------------------------------------------------------------------------

describe('assetName', () => {
  it('returns linux x64 tar.xz', () => {
    expect(assetName('linux', 'x64')).toBe('primer-x86_64-unknown-linux-gnu.tar.xz');
  });

  it('returns linux arm64 tar.xz', () => {
    expect(assetName('linux', 'arm64')).toBe('primer-aarch64-unknown-linux-gnu.tar.xz');
  });

  it('returns darwin x64 tar.xz', () => {
    expect(assetName('darwin', 'x64')).toBe('primer-x86_64-apple-darwin.tar.xz');
  });

  it('returns darwin arm64 tar.xz', () => {
    expect(assetName('darwin', 'arm64')).toBe('primer-aarch64-apple-darwin.tar.xz');
  });

  it('returns windows zip on win32', () => {
    expect(assetName('win32', 'x64')).toBe('primer-x86_64-pc-windows-msvc.zip');
  });

  it('throws on unsupported platform', () => {
    expect(() => assetName('freebsd' as NodeJS.Platform, 'x64')).toThrow(
      'Unsupported platform: freebsd/x64',
    );
  });
});

// ---------------------------------------------------------------------------
// buildCommentBody
// ---------------------------------------------------------------------------

describe('buildCommentBody', () => {
  it('returns no-findings message when sarif file does not exist', () => {
    const body = buildCommentBody('requirements.txt', '/nonexistent/path.sarif');
    expect(body).toContain(COMMENT_MARKER);
    expect(body).toContain('requirements.txt');
    expect(body).toContain('No findings');
  });

  it('returns clean message when sarif has no results', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'primer-test-'));
    const sarifPath = path.join(dir, 'results.sarif');
    fs.writeFileSync(sarifPath, JSON.stringify({ runs: [{ results: [] }] }));

    const body = buildCommentBody('package-lock.json', sarifPath);
    expect(body).toContain(COMMENT_MARKER);
    expect(body).toContain('No vulnerabilities found');

    fs.rmSync(dir, { recursive: true });
  });

  it('builds findings table from sarif results', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'primer-test-'));
    const sarifPath = path.join(dir, 'results.sarif');
    const sarif = {
      runs: [{
        results: [
          { ruleId: 'GHSA-0001', level: 'error',   message: { text: 'critical issue' } },
          { ruleId: 'GHSA-0002', level: 'warning',  message: { text: 'high issue' } },
          { ruleId: 'GHSA-0003', level: 'note',     message: { text: 'low issue' } },
        ],
      }],
    };
    fs.writeFileSync(sarifPath, JSON.stringify(sarif));

    const body = buildCommentBody('requirements.txt', sarifPath);
    expect(body).toContain(COMMENT_MARKER);
    expect(body).toContain('GHSA-0001');
    expect(body).toContain('GHSA-0002');
    expect(body).toContain('GHSA-0003');
    expect(body).toContain('🔴');
    expect(body).toContain('🟡');
    expect(body).toContain('🔵');
    expect(body).toContain('primer scan --file requirements.txt');

    fs.rmSync(dir, { recursive: true });
  });
});
