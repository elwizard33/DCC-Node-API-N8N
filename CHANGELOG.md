# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres (in spirit) to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
- Planned: Additional transaction types (reissue, massTransfer, data, invokeScript, setScript, setAssetScript, sponsorship, updateAssetInfo)
- Planned: Advanced NFT operations and asset distribution analytics
- Planned: Test suite for transaction validation

## [0.3.2] - 2025-09-23
### Added
- Attachment UI for transfer and massTransfer: new Attachment collection with Mode (None | Plain Text | Base58)

### Fixed
- Transaction attachments now support plain text (auto‑encoded to Base58) and Base58 inputs with validation
- Enforced 140‑byte decoded limit with clear error messages including byte count
- Documentation updated with examples and guidance

## [0.3.1] - 2025-09-18
### Fixed
- Show DccApi credentials only for node (account/token/transaction/utility) resources; show DccMatcherApi only for matcher actions
- Display Amount/Price Asset fields for order placement when not using raw JSON so users can submit via fields

## [0.3.0] - 2025-09-18
### Added
- User-friendly Matcher forms for placing limit/market orders and cancellations (no more mandatory raw JSON)
- Documentation updates for Matcher usage, credentials, and examples

### Changed
- Kept raw JSON as an advanced fallback for both order placement and cancellations
- Clear separation of Dcc API vs Dcc Matcher API credentials throughout the UI and execution

### Fixed
- Minor title/label consistency and lints in matcher-related fields

## [0.2.9] - 2025-09-18
### Added
- DccMatcherApi credentials with API token and Base URL so users can target their own matcher endpoint (not hardcoded)
- New "Matcher" resource with operations: asset rates, order books, order placement, and cancellations

### Changed
- Node UI and logic accept a configurable matcher base URL (via credentials or a field fallback)

## [0.2.7] - 2025-09-16
### Fixed
- Dual fallback for library loading: try both `@decentralchain/waves-transactions` and `@waves/waves-transactions` across common n8n install paths
- Bundled both libraries to ensure availability when installed as a community node
- Retained runtime fallback loader and detailed diagnostics; avoids hard failure while surfacing clear debug info

## [0.2.5] - 2025-09-16
### Fixed
- **Library loading**: Improved waves-transactions library loading with multiple fallback paths for n8n environments
- **Dependency bundling**: Added bundledDependencies to ensure @decentralchain/waves-transactions is packaged with the node
- **Error diagnostics**: Enhanced library loading error logging with module paths and working directory info

## [0.2.8] - 2025-09-16
### Fixed
- Sync package-lock.json to include `@waves/waves-transactions` and transitive dependencies so `npm ci` passes in CI
- Verified build and tests; pushed new tag to trigger publish workflow
- **Code quality**: Fixed duplicate variable declarations in library initialization

## [0.2.4] - 2025-09-16
### Added
- **Enhanced debugging**: Extensive debug logging for transaction creation, broadcast, and library loading
- **Private key validation**: Improved private key handling and authentication checks
- **Transaction diagnostics**: Added transaction type, version, proof, and signature details to debug output
- **Broadcast verification**: Enhanced broadcast result validation and error handling

## [0.2.3] - 2025-09-16
### Added
- **Debug logging**: Comprehensive debug information added to all transaction and query results
- **Error reporting**: Enhanced error details with stack traces for failed broadcasts
- **API debugging**: Parameter logging for all API query operations
- **Troubleshooting**: Timestamp, operation type, chain ID, and auth method in debug logs

### Fixed
- **README badge**: Corrected GitHub Actions badge URL to use proper repository name

## [0.2.2] - 2025-09-16
### Fixed
- **Chain ID symbols**: Corrected mainnet to '?' and testnet to '!' (previously incorrect 'L' and 'T')
- **UX improvement**: Removed password type from amount field for better user experience
- **Documentation**: Updated alias format description to use correct mainnet symbol
- **Consistency**: Updated default chain ID in execute function to match UI

## [0.2.1] - 2025-09-16
### Fixed
- **Jest compatibility**: Resolved module resolution issue for @decentralchain/waves-transactions in test environment
- **CI/CD tests**: Fixed test failures in GitHub Actions by using conditional imports
- **TypeScript errors**: Fixed type casting for broadcast function parameters
- **Testing workflow**: Tests now pass both locally and in CI environment

## [0.2.0] - 2025-09-16
### Added
- **MAJOR**: Integration with @decentralchain/waves-transactions library for native transaction creation
- **Transaction Operations**: Transfer, Issue, Burn, Lease, Cancel Lease, Create Alias
- **Enhanced Query Operations**: All asset balances, specific asset balance, multiple token details, NFTs, aliases
- **Multiple Authentication Methods**: Seed phrase, private key, unsigned transaction creation
- **Network Support**: Mainnet (L) and Testnet (T) selection
- **Auto-broadcast**: Optional automatic transaction broadcasting with error handling
- **User-friendly Interface**: Intuitive parameter names, descriptions, and validation
- **Security**: Secure handling of sensitive credentials with proper field masking

### Enhanced
- Complete rewrite of transaction handling using professional-grade library
- Improved error handling with detailed feedback
- Rich transaction status reporting (created, broadcasted, failed)
- Portfolio management capabilities with comprehensive asset queries
- NFT ecosystem support for modern DCC applications

### Technical
- Type-safe parameter handling throughout
- Backward compatibility maintained for existing workflows
- Professional transaction signing and validation
- Comprehensive API endpoint coverage for DCC blockchain

## [0.1.7] - 2025-09-16
### Fixed
- Replace placeholder routing with proper execute method implementation
- Fix 404 errors when making API requests to DCC nodes
- Add complete endpoint construction for all operations (account, token, transaction, utility)
- Implement proper error handling and response formatting
- Remove faulty routing configuration that caused runtime failures

## [0.1.6] - 2025-09-16
### Fixed
- Release workflow now uses correct NPM_SECRET environment variable name

## [0.1.5] - 2025-09-16
### Added
- Complete DCC node implementation with routing for accounts, tokens, transactions, and utilities
- DccApi credential with token authentication and node status testing
- Force-copy fallback script to ensure build artifacts in CI environments
### Fixed
- Missing DCC source files committed to repository (were previously untracked)
- TypeScript compilation issues with IExecuteFunctions interface
- Build artifact verification with retry logic and debug output
- Lint issues in credential documentation URLs

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
