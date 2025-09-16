import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class DccApi implements ICredentialType {
	name = 'dccApi';
	displayName = 'DCC Node API';
	documentationUrl = 'https://docs.decentralchain.io/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'token',
			type: 'string',
			default: '',
			required: true,
			description: 'Bearer token used to authenticate against the DCC node endpoint.',
			typeOptions: { password: true },
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://nodes.decentralchain.io',
			description: 'Root URL of the DCC node REST API.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.token}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/node/status',
		},
	};
}
