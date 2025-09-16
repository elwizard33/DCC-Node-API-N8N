import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
} from 'n8n-workflow';

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
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;

			const credentials = await this.getCredentials('dccApi');
			const baseUrl = credentials?.baseUrl || this.getNodeParameter('baseUrl', i) as string;

			let endpoint = '';
			let method = 'GET';
			let body: IDataObject | undefined;

			// Build endpoint based on resource and operation
			if (resource === 'account' && operation === 'getAccount') {
				const address = this.getNodeParameter('address', i) as string;
				endpoint = `/addresses/balance/${address}`;
			} else if (resource === 'token' && operation === 'getToken') {
				const assetId = this.getNodeParameter('assetId', i) as string;
				endpoint = `/assets/details/${assetId}`;
			} else if (resource === 'transaction' && operation === 'listTransactions') {
				const ownerAddress = this.getNodeParameter('ownerAddress', i) as string;
				const limit = this.getNodeParameter('limit', i) as number;
				const offset = this.getNodeParameter('offset', i) as string;
				endpoint = `/transactions/address/${ownerAddress}/limit/${limit}?after=${offset}`;
			} else if (resource === 'transaction' && operation === 'broadcastTransaction') {
				const txJson = this.getNodeParameter('txJson', i) as string;
				endpoint = '/transactions/broadcast';
				method = 'POST';
				body = JSON.parse(txJson);
			} else if (resource === 'utility' && operation === 'generateAddress') {
				const publicKey = this.getNodeParameter('publicKey', i) as string;
				endpoint = `/addresses/publicKey/${publicKey}`;
			} else if (resource === 'utility' && operation === 'validateAddress') {
				const addressToValidate = this.getNodeParameter('addressToValidate', i) as string;
				endpoint = `/addresses/validate/${addressToValidate}`;
			} else {
				endpoint = '/node/status';
			}

			try {
				const options = {
					method,
					url: `${baseUrl}${endpoint}`,
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
					},
					json: true,
				} as any;

				if (body) {
					options.body = body;
				}

				const response = await this.helpers.httpRequest(options);
				returnData.push({ json: response });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
				} else {
					throw new NodeApiError(this.getNode(), error);
				}
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
