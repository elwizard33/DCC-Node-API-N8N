![Banner image](https://decentralchain.io/wp-content/uploads/2023/02/dcc-n8n-node.webp)

# DCC Node Api Connector for N8N

<p align="left">
  <a href="https://www.npmjs.com/package/n8n-nodes-dcc"><img src="https://img.shields.io/npm/v/n8n-nodes-dcc.svg" alt="npm version"></a>
  <a href="https://github.com/elwizard33/DCC-Node-API-N8N/actions/workflows/ci.yml"><img src="https://github.com/elwizard33/DCC-Node-API-N8N/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="https://www.npmjs.com/package/n8n-nodes-dcc"><img src="https://img.shields.io/npm/dm/n8n-nodes-dcc.svg" alt="npm downloads"></a>
  <a href="./LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license: MIT"></a>
</p>

> Production readiness: early 0.x; expect breaking changes until 1.0. Follow semver guidance below.

The DCC Node REST API offers the ability to read blockchain data such as account data, token data, active leases, blocks, transactions, and other data including feature activation status and block reward voting status. It also provides transaction management functions like broadcasting signed transactions, pre-validating and checking transaction status. Additionally, it offers utilities for generating addresses from public keys, validating addresses, generating random seeds, calculating hashes, and more.

With this N8N you will be able to connect the DCC node api to your workflows, automate blockchain tasks or trigger wallet creations and more.

## Installation

Install the community package in your n8n instance (requires enabling Community Nodes):

```bash
npm install n8n-nodes-dcc
```

Restart n8n after installation so it loads the new node bundle.

### Enabling Community Nodes (if not already)
1. In n8n UI go to Settings > Community Nodes.
2. Enable the feature (confirm the security notice).
3. Add this package name `n8n-nodes-dcc` if using the in-app installer or install via CLI as above.

### Updating
```bash
npm update n8n-nodes-dcc
```

Check changelog and commit history for potential breaking changes (0.x minor bumps may be breaking until 1.0.0).

## Semantic Versioning

This project follows Semantic Versioning principles; however while in 0.x the API surface (parameters, field names) may change in minor releases. Once 1.0.0 is reached:

- MAJOR: Breaking changes to node description/fields/behavior.
- MINOR: Backwards-compatible features (new resources / operations / optional fields).
- PATCH: Backwards-compatible bug fixes and internal maintenance.

Pin exact versions in mission‑critical environments to avoid unexpected changes.

### Releasing Manually
1. Update `CHANGELOG.md` with changes.
2. Bump version in `package.json` following SemVer guidance.
3. Commit: `chore(release): vX.Y.Z`.
4. Tag: `git tag -a vX.Y.Z -m "vX.Y.Z"` then `git push --tags`.
5. Release workflow (after added) publishes on matching tag.

See detailed steps in `CONTRIBUTING.md`.

## Features / Operations

Resources supported:

- Account
  - Get Account: Retrieve balance & basic account info
- Token
  - Get Token: Retrieve token / asset metadata
- Transaction
  - List Transactions: Paginated list for an address (limit & offset)
  - Broadcast Transaction: Broadcast a signed transaction JSON
- Utility
  - Generate Address: Derive address from a supplied public key
  - Validate Address: Check if an address is valid in the network
 - Matcher
  - Get Order Books/Book/Status/Restrictions
  - Asset Rates (get/upsert/delete)
  - Place Orders (limit/market) and Cancel (by pair or all)

## Credentials

The node can operate with or without credentials.

- Create a credential of type `DccApi` to centrally manage the Node Base URL and/or include a bearer token for authenticated endpoints (future expansion).
- Create a credential of type `DccMatcherApi` to centrally manage the Matcher Base URL and API token. This is separate from the node API and is used only for the Matcher resource.

Credential fields:

| Field | Description |
|-------|-------------|
| Base URL | Optional override of default public node endpoint |
| Token | Bearer token (if your node requires auth) |

Matcher credential (`DccMatcherApi`) fields:

| Field | Description |
|-------|-------------|
| Base URL | Matcher endpoint, e.g. https://mainnet-matcher.decentralchain.io |
| Token | Bearer token used by your matcher instance (if required) |

If no credential is supplied, the node uses the `Base URL` parameter on the node itself.

## Usage Examples

### 1. Get Account
1. Add the DCC node.
2. Select Resource = Account, Operation = Get Account.
3. Enter the account Address.
4. Execute to receive balances and other basic data.

### 2. List Transactions
1. Resource = Transaction, Operation = List Transactions.
2. Provide Owner Address, adjust Limit & Offset as needed.
3. Execute to return an array of transactions.

### 3. Broadcast Transaction
1. Resource = Transaction, Operation = Broadcast Transaction.
2. Paste the signed transaction JSON into the Signed Transaction JSON field.
3. Execute; response includes success status or validation errors.

### 4. Generate Address
1. Resource = Utility, Operation = Generate Address.
2. Provide a Public Key.
3. Execute to get derived address.

### 5. Validate Address
### 6. Matcher: Get Order Book
1. Resource = Matcher, Operation = Get Order Book.
2. Fill Amount Asset and Price Asset (use `DCC` for the native asset).
3. Optionally set Depth.
4. Execute to get bids/asks and market info.

### 7. Matcher: Place Limit Order (user-friendly form)
1. Resource = Matcher, Operation = Place Limit Order.
2. Provide Amount Asset, Price Asset, Order Type (buy/sell), Amount (long units), Price (long units), Fee, Fee Asset, Sender Public Key, Expiration, Version.
3. Execute; the node builds the order JSON for you and sends it to the matcher.
4. If you prefer to paste raw JSON, enable "Use Raw Order JSON" and supply the full order object.

### 8. Matcher: Cancel Order(s)
1. Resource = Matcher, Operation = Cancel Order (by Pair) or Cancel All Orders.
2. By default, use the form fields: Sender Address, Order ID (optional to cancel all in pair), Timestamp (0 to auto), Signature (optional if your matcher requires it).
3. For advanced cases, enable "Use Raw Cancel JSON" and paste the exact body expected by the matcher.

Notes:
- Matcher Base URL will be taken from the `DccMatcherApi` credential when provided; otherwise the node uses the "Matcher Base URL" field on the node.
- Amount/Price are expected in long units (smallest units) as per matcher conventions.
1. Resource = Utility, Operation = Validate Address.
2. Provide the address string.
3. Execute to get validation result.

## Development / Build

Install dependencies and build:

```bash
npm install
npm run build
npm run check:dist
```

Lint & format:

```bash
npm run lint
npm run lintfix
npm run format
```

## Project Health

- [Changelog](./CHANGELOG.md)
- [Security Policy](./SECURITY.md)

## Prerequisites

You need the following installed on your development machine:

* Node API Key, you can get this by running your own node or renting an API from someone else in the network.

## More information

Refer to our documentation to get more background on how the DCC node works: [DecentralChain Documentation](https://docs.decentralchain.io/)

## Contributing

Issues & PRs welcome. Please open security-related issues with the SECURITY prefix (see Security Policy).

## License

[MIT](./LICENSE.md)
