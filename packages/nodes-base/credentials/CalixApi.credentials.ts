import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

export class CalixApi implements ICredentialType {
	name = 'calixApi';
	displayName = 'Calix API';
	properties = [
		{
			displayName: 'Username',
			name: 'username',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
	];
}
