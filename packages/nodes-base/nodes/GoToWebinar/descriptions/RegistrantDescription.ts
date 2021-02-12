import {
	INodeProperties,
} from 'n8n-workflow';

export const registrantOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'get',
		description: 'Operation to perform',
		options: [
			{
				name: 'Create',
				value: 'create',
			},
			{
				name: 'Delete',
				value: 'delete',
			},
			{
				name: 'Get',
				value: 'get',
			},
			{
				name: 'Get All',
				value: 'getAll',
			},
		],
		displayOptions: {
			show: {
				resource: [
					'registrant',
				],
			},
		},
	},
] as INodeProperties[];

export const registrantFields = [
	// ----------------------------------
	//         registrant: create
	// ----------------------------------
	{
		displayName: 'Webinar Key',
		name: 'webinarKey',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getWebinars',
		},
		required: true,
		default: {},
		description: 'Key of the webinar of the registrant to create.',
		displayOptions: {
			show: {
				resource: [
					'registrant',
				],
				operation: [
					'create',
				],
			},
		},
	},
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		default: '',
		description: 'First name of the registrant to create.',
		displayOptions: {
			show: {
				resource: [
					'registrant',
				],
				operation: [
					'create',
				],
			},
		},
	},
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		default: '',
		description: 'Last name of the registrant to create.',
		displayOptions: {
			show: {
				resource: [
					'registrant',
				],
				operation: [
					'create',
				],
			},
		},
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		description: 'Email address of the registrant to create.',
		displayOptions: {
			show: {
				resource: [
					'registrant',
				],
				operation: [
					'create',
				],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: [
					'registrant',
				],
				operation: [
					'create',
				],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Full Address',
				name: 'fullAddress',
				placeholder: 'Add Address Fields',
				type: 'fixedCollection',
				description: 'Full address of the registrant to create.',
				default: {},
				options: [
					{
						displayName: 'Details',
						name: 'details',
						values: [
							{
								displayName: 'Address',
								name: 'address',
								type: 'string',
								default: '',
							},
							{
								displayName: 'City',
								name: 'city',
								type: 'string',
								default: '',
							},
							{
								displayName: 'State',
								name: 'state',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Zip Code',
								name: 'zipCode',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Country',
								name: 'country',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Industry',
				name: 'industry',
				type: 'string',
				default: '',
				description: 'The type of industry the registrant\'s organization belongs to.',
			},
			{
				displayName: 'Job Title',
				name: 'jobTitle',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Number of Employees',
				name: 'numberOfEmployees',
				type: 'string',
				default: '',
				description: 'The size in employees of the registrant\'s organization.',
			},
			{
				displayName: 'Organization',
				name: 'organization',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Telephone',
				name: 'phone',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Purchasing Role',
				name: 'purchasingRole',
				type: 'string',
				default: '',
				description: 'Registrant\'s role in purchasing the product.',
			},
			{
				displayName: 'Purchasing Time Frame',
				name: 'purchasingTimeFrame',
				type: 'string',
				default: '',
				description: 'Time frame within which the product will be purchased.',
			},
			{
				displayName: 'Questions and Comments',
				name: 'questionsAndComments',
				type: 'string',
				default: '',
				description: 'Questions or comments made by the registrant during registration.',
			},
			{
				displayName: 'Resend Confirmation',
				name: 'resendConfirmation',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Responses',
				name: 'responses',
				placeholder: 'Add Response',
				type: 'fixedCollection',
				description: 'Set the answers to all questions.',
				default: {},
				options: [
					{
						displayName: 'Details',
						name: 'details',
						values: [
							{
								displayName: 'Question Key',
								name: 'questionKey',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Response Text',
								name: 'responseText',
								type: 'string',
								default: '',
								description: 'Text of the response to the question.',
							},
							{
								displayName: 'Answer Key',
								name: 'answerKey',
								type: 'string',
								default: '',
								description: 'The numeric key of the answer to a multiple-choice question.',
							},
						],
					},
				],
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
				description: 'The source that led to the registration.',
			},
		],
	},
	// ----------------------------------
	//        registrant: getAll
	// ----------------------------------
	{
		displayName: 'Webinar Key',
		name: 'webinarKey',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getWebinars',
		},
		required: true,
		default: {},
		description: 'The key of the webinar to retrieve registrants from.',
		displayOptions: {
			show: {
				resource: [
					'registrant',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Return all results.',
		displayOptions: {
			show: {
				resource: [
					'registrant',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 10,
		description: 'The number of results to return.',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		displayOptions: {
			show: {
				resource: [
					'registrant',
				],
				operation: [
					'getAll',
				],
				returnAll: [
					false,
				],
			},
		},
	},
	// ----------------------------------
	//         registrant: delete
	// ----------------------------------
	{
		displayName: 'Webinar Key',
		name: 'webinarKey',
		type: 'string',
		required: true,
		default: '',
		description: 'Key of the webinar of the registrant to delete.',
		displayOptions: {
			show: {
				resource: [
					'registrant',
				],
				operation: [
					'delete',
				],
			},
		},
	},
	{
		displayName: 'Registrant Key',
		name: 'registrantKey',
		type: 'string',
		required: true,
		default: '',
		description: 'Key of the registrant to delete.',
		displayOptions: {
			show: {
				resource: [
					'registrant',
				],
				operation: [
					'delete',
				],
			},
		},
	},
	// ----------------------------------
	//         registrant: get
	// ----------------------------------
	{
		displayName: 'Webinar Key',
		name: 'webinarKey',
		type: 'string',
		required: true,
		default: '',
		description: 'Key of the webinar of the registrant to retrieve.',
		displayOptions: {
			show: {
				resource: [
					'registrant',
				],
				operation: [
					'get',
				],
			},
		},
	},
	{
		displayName: 'Registrant Key',
		name: 'registrantKey',
		type: 'string',
		required: true,
		default: '',
		description: 'Key of the registrant to retrieve.',
		displayOptions: {
			show: {
				resource: [
					'registrant',
				],
				operation: [
					'get',
				],
			},
		},
	},
] as INodeProperties[];
