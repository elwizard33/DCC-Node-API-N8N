import {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class DccMatcherApi implements ICredentialType {
    name = 'dccMatcherApi';
    displayName = 'DCC Matcher API';
    documentationUrl = 'https://docs.decentralchain.io/';
    properties: INodeProperties[] = [
        {
            displayName: 'API Token',
            name: 'token',
            type: 'string',
            default: '',
            required: false,
            description: 'Bearer token used to authenticate against the DCC Matcher endpoint (required for protected routes).',
            typeOptions: { password: true },
        },
        {
            displayName: 'Base URL',
            name: 'baseUrl',
            type: 'string',
            default: 'https://mainnet-matcher.decentralchain.io',
            description: 'Root URL of the DCC Matcher REST API.',
        },
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                Authorization: '={{$credentials.token ? ("Bearer " + $credentials.token) : undefined}}',
            },
        },
    };

    test: ICredentialTestRequest = {
        request: {
            baseURL: '={{$credentials.baseUrl}}',
            url: '/matcher/orderbook',
        },
    };
}
