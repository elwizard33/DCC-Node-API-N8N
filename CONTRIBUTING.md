# Contributing

Thank you for your interest in contributing to `n8n-nodes-dcc`!

## Overview
This repository provides community n8n nodes for interacting with the DecentralChain (DCC) node REST API.

## Getting Started
1. Fork the repository
2. Clone locally and install dependencies:
   ```bash
   npm ci
   ```
3. Build & verify:
   ```bash
   npm run build && npm run check:dist
   ```
4. (Optional) Run tests (after test setup):
   ```bash
   npm test
   ```

## Development Guidelines
- Follow existing TypeScript style enforced by ESLint & Prettier.
- Each node must export a coherent `INodeTypeDescription` with clear display names and actions.
- Keep credentials minimal and secure; mark secret fields with `typeOptions.password`.

## Commit Messages
Use clear, conventional style where possible:
- `feat:` new capability
- `fix:` bug fix
- `docs:` documentation only
- `chore:` build or tooling changes

## Submitting Changes
1. Create a feature branch
2. Ensure lint/build/check:dist succeed
3. Update CHANGELOG.md if user-facing changes
4. Open a Pull Request describing motivation & testing

## Security Reporting
Do not file public issues with exploit details. Open an issue with the prefix `SECURITY:` and provide only a high-level description. See [Security Policy](./SECURITY.md).

## Release & Versioning

While in 0.x, treat MINOR bumps as potentially breaking. After 1.0.0 we follow standard SemVer.

### Commit Conventions (Recommended)
Using Conventional Commits helps automate changelog generation:
`feat:`, `fix:`, `perf:`, `refactor:`, `docs:`, `test:`, `chore:` etc.

### Manual Release Steps
1. Ensure branch is up to date with `master`.
2. Review open PRs/issues for inclusion.
3. Update `CHANGELOG.md` (group by Added / Changed / Fixed / Removed if relevant).
4. Decide next version:
   - If breaking (post-1.0): bump MAJOR.
   - New features, backwards compatible: bump MINOR.
   - Bug fixes only: bump PATCH.
5. Update `package.json` version.
6. Commit: `chore(release): vX.Y.Z` (only version and changelog updates ideally).
7. Create annotated tag: `git tag -a vX.Y.Z -m "vX.Y.Z"`.
8. Push commit & tags: `git push && git push --tags`.
9. Release workflow (once added) will build and publish to npm if tag matches `v*.*.*`.
10. Verify npm: `npm info n8n-nodes-dcc version`.

### Post-Release
- Open a PR to start the next development cycle if needed (e.g., add placeholder section in CHANGELOG).
- Announce changes or highlight breaking updates in README if critical.

### Canary / Pre-release (Optional Future)
We may introduce pre-release tags (e.g., `1.1.0-beta.1`) for significant new features. These tags should not be used in production automation until promoted.

## Style & Lint
Run:
```bash
npm run lint
npm run lintfix
```

## Testing
Add tests under `tests/` mirroring source structure. Keep them deterministic.

## Code of Conduct
This project follows the standard open-source Code of Conduct. Be respectful and inclusive.

## Thank You
Your contributions help strengthen the DCC ecosystem and automation capabilities in n8n.
