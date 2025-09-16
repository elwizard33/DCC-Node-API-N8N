# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres (in spirit) to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
- Planned: Additional DCC operations (staking, leasing, governance endpoints)
- Planned: Test suite for validation helpers

## [0.1.2] - 2025-09-15
### Added
- README badges, installation, semantic versioning & manual release guidance
- CONTRIBUTING expanded with release & versioning steps
- Automated release publish GitHub Action on tags
- Jest test harness & initial metadata test
### Changed
- Enhanced package metadata (homepage, bugs url, keywords, ci script)
### Security
- Security policy with upstream advisory documentation

## [0.1.3] - 2025-09-15
### Fixed
- Synchronized package-lock.json with dependency upgrades (previous publish workflow failed `npm ci` due to lock mismatch)

## [0.1.4] - 2025-09-15
### Fixed
- Committed regenerated package-lock.json (prior tag still missed lockfile update causing npm ci failure in workflow)

## [0.1.1] - 2025-09-15
### Added
- Initial DCC package metadata (renamed, description, keywords)
- Changelog and security planning scaffolding
- Preparation for DccApi credential & DCC node implementation

## [0.1.0] - 2025-09-15
### Added
- Starter template baseline (Example & HttpBin nodes, credentials, lint & build setup)
