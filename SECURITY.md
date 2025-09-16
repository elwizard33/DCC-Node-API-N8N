# Security Policy

## Supported Versions

This is a community n8n node package in early development (0.x). Only the latest published version receives security-related attention.

## Reporting a Vulnerability

Please open a GitHub Issue in this repository with a clear SECURITY prefix in the title (do **not** include sensitive exploit details initially). We will request more information privately if needed.

## Known Upstream Vulnerabilities

The package inherits transitive dependencies from the n8n ecosystem which currently (as of 2025-09-15) report the following advisories:

| Package    | Advisory ID | Severity | Description | Link |
|------------|-------------|----------|-------------|------|
| axios      | GHSA-4hjh-wcwx-xvwj | High | Potential DoS via large payload / lack of size checks | https://github.com/advisories/GHSA-4hjh-wcwx-xvwj |
| form-data  | GHSA-fjxv-7rqg-78g4 | Critical | Unsafe random function for multipart boundary | https://github.com/advisories/GHSA-fjxv-7rqg-78g4 |

These are introduced via upstream n8n packages (e.g., `n8n-workflow`, `n8n-core`). Direct remediation inside this community package is not possible until upstream releases patched versions.

### Mitigation Guidance
- Keep your n8n instance updated; monitor n8n release notes.
- Restrict network egress and inbound accessibility of n8n to trusted environments.
- Prefer validated inputs when constructing requests broadcast via this node.
- Monitor for abnormal resource usage that might indicate payload-based DoS attempts.

## Dependency Monitoring
We recommend enabling GitHub Dependabot (or similar) on your fork to receive alerts when upstream fixes become available.

## Cryptographic & Key Material Handling
The DCC node credential uses a bearer token. Treat tokens as secrets:
- Store via n8n encrypted credentials only.
- Never commit tokens to version control.
- Rotate tokens periodically.

## Responsible Disclosure Timeline
We aim to acknowledge valid security issue reports within 5 business days.
