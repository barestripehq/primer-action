# primer-action

GitHub Action for [primer](https://github.com/barestripehq/primer) — scans manifests and lockfiles for vulnerabilities before they reach your project.

## Usage

```yaml
permissions:
  security-events: write   # SARIF upload
  pull-requests: write     # PR comments
  actions: read
  contents: read

steps:
  - uses: actions/checkout@v6

  - uses: barestripehq/primer-action@v1
    with:
      file: package-lock.json
```

## Inputs

| Input | Required | Default | Description |
|-------|----------|---------|-------------|
| `file` | yes | — | Manifest or lockfile to scan (`requirements.txt`, `package-lock.json`, `Cargo.lock`, etc.) |
| `threshold` | no | `high` | Minimum severity that blocks the check: `critical`, `high`, `medium`, `low` |
| `upload-sarif` | no | `true` | Upload SARIF results to GitHub Security tab |
| `comment-pr` | no | `true` | Post a findings summary as a PR comment |
| `fail-on-findings` | no | `true` | Exit 1 when blocking findings are detected |
| `primer-version` | no | `latest` | Pin a specific primer release tag (e.g. `v0.1.4`) |
| `token` | no | `github.token` | GitHub token for SARIF upload and PR comments |

## Outputs

| Output | Description |
|--------|-------------|
| `findings-count` | Total vulnerabilities found |
| `blocking-count` | Findings at or above the threshold |
| `sarif-path` | Absolute path to the generated SARIF file |

## Examples

### Scan multiple manifests

```yaml
- uses: barestripehq/primer-action@v1
  with:
    file: backend/requirements.txt

- uses: barestripehq/primer-action@v1
  with:
    file: frontend/package-lock.json
```

### Audit only — never block

```yaml
- uses: barestripehq/primer-action@v1
  with:
    file: Cargo.lock
    fail-on-findings: 'false'
```

### Stricter threshold

```yaml
- uses: barestripehq/primer-action@v1
  with:
    file: requirements.txt
    threshold: medium
```

## Platform support

Linux (x86\_64, ARM64) and macOS (Intel, Apple Silicon). Windows support is planned.

## License

MIT
