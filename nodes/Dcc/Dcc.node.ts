import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Dcc implements INodeType {
	// Using routing for most operations; broadcast will rely on routing POST body mapping
	description: INodeTypeDescription = {
		displayName: 'DecentralChain (DCC)',
		name: 'dcc',
		icon: 'file:dcc.svg',
		group: ['transform'],
		version: 1,
		description: 'Interact with DecentralChain (DCC) node REST API',
		defaults: { name: 'DCC' },
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{ name: 'dccApi', required: false },
		],
		requestDefaults: {
			baseURL: '={{$credentials?.dccApi?.baseUrl || $parameter.baseUrl}}',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		},
		properties: [
			// Base URL override (optional if credential not used)
			{
				displayName: 'Base URL',
				name: 'baseUrl',
				type: 'string',
				default: 'https://nodes.decentralchain.io',
				description: 'Base URL to use when credential not supplied',
				required: true,
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Account', value: 'account' },
					{ name: 'Token', value: 'token' },
					{ name: 'Transaction', value: 'transaction' },
					{ name: 'Utility', value: 'utility' },
				],
				default: 'account',
			},
			// Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['account'] } },
				options: [
					{ name: 'Get Account', value: 'getAccount', action: 'Get account balance & info' },
				],
				default: 'getAccount',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['token'] } },
				options: [
					{ name: 'Get Token', value: 'getToken', action: 'Get token / asset information' },
				],
				default: 'getToken',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['transaction'] } },
				options: [
					{ name: 'List Transactions', value: 'listTransactions', action: 'List account transactions' },
					{ name: 'Broadcast Transaction', value: 'broadcastTransaction', action: 'Broadcast signed transaction JSON' },
				],
				default: 'listTransactions',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['utility'] } },
				options: [
					{ name: 'Generate Address', value: 'generateAddress', action: 'Generate address from public key' },
					{ name: 'Validate Address', value: 'validateAddress', action: 'Validate address format' },
				],
				default: 'generateAddress',
			},
			// Common fields
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['account'], operation: ['getAccount'] } },
				description: 'DCC address to retrieve info for',
			},
			{
				displayName: 'Asset ID',
				name: 'assetId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['token'], operation: ['getToken'] } },
				description: 'Token / asset identifier',
			},
			{
				displayName: 'Owner Address',
				name: 'ownerAddress',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['transaction'], operation: ['listTransactions'] } },
				description: 'Address whose transactions to list',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				displayOptions: { show: { resource: ['transaction'], operation: ['listTransactions'] } },
				description: 'Max number of results to return',
				typeOptions: { minValue: 1 },
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				displayOptions: { show: { resource: ['transaction'], operation: ['listTransactions'] } },
				description: 'Offset for pagination',
				typeOptions: { minValue: 0 },
			},
			{
				displayName: 'Signed Transaction JSON',
				name: 'txJson',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['transaction'], operation: ['broadcastTransaction'] } },
				placeholder: '{"type":4,"senderPublicKey":...}',
				description: 'Raw signed transaction JSON string',
			},
			{
				displayName: 'Public Key',
				name: 'publicKey',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['utility'], operation: ['generateAddress'] } },
				description: 'Public key to derive address from',
			},
			{
				displayName: 'Address to Validate',
				name: 'addressToValidate',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['utility'], operation: ['validateAddress'] } },
			},
			// Routing definitions
			{
				displayName: 'Routing (Internal)',
				name: 'routingInternal',
				type: 'hidden',
				noDataExpression: true,
				default: '',
				routing: {
					request: {
						// dynamic handler placeholder
					},
				},
			},
		],
	};
}
