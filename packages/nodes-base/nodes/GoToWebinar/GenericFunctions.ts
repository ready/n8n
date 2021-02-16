import {
	IExecuteFunctions,
	IHookFunctions,
} from 'n8n-core';

import {
	IDataObject,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import {
	OptionsWithUri,
} from 'request';

import * as moment from 'moment';

import * as losslessJSON from 'lossless-json';

/**
 * Make an authenticated API request to GoToWebinar.
 */
export async function goToWebinarApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: string,
	endpoint: string,
	qs: IDataObject,
	body: IDataObject | IDataObject[],
	option: IDataObject = {},
) {

	const operation = this.getNodeParameter('operation', 0) as string;
	const resource = this.getNodeParameter('resource', 0) as string;

	const options: OptionsWithUri = {
		headers: {
			'user-agent': 'n8n',
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		method,
		uri: `https://api.getgo.com/G2W/rest/v2/${endpoint}`,
		qs,
		body: JSON.stringify(body),
		json: false,
	};

	if (resource === 'session' && operation === 'getAll') {
		options.headers!['Accept'] = 'application/vnd.citrix.g2wapi-v1.1+json';
	}

	if (['GET', 'DELETE'].includes(method)) {
		delete options.body;
	}

	if (!Object.keys(qs).length) {
		delete options.qs;
	}

	if (Object.keys(option)) {
		Object.assign(options, option);
	}

	console.log(options);

	try {
		const response = await this.helpers.requestOAuth2!.call(this, 'goToWebinarOAuth2Api', options, { check403: true });

		if (response === '') {
			return {};
		}

		// https://stackoverflow.com/questions/62190724/getting-gotowebinar-registrant
		return losslessJSON.parse(response, convertLosslessNumber);
	} catch (error) {

		if (error.statusCode === 403) {
			throw new Error('The Go To Webinar credentials are invalid!');
		}

		if (error?.response?.body) {
			let errorMessage;
			const body = JSON.parse(error.response.body);
			if (Array.isArray(body.validationErrorCodes)) {
				errorMessage = (body.validationErrorCodes as IDataObject[]).map((e) => e.description).join('|');
			} else {
				errorMessage = body.description;
			}
			throw new Error(`Go To Webinar error response [${error.statusCode}]: ${errorMessage}`);
		}

		throw error;
	}
}

/**
 * Make an authenticated API request to GoToWebinar and return all results.
 */
export async function goToWebinarApiRequestAllItems(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: string,
	endpoint: string,
	qs: IDataObject,
	body: IDataObject,
	resource: string,
) {

	const resourceToResponseKey: { [key: string]: string } = {
		session: 'sessionInfoResources',
		webinar: 'webinars',
	};

	const key = resourceToResponseKey[resource];

	let returnData: IDataObject[] = [];
	let responseData;

	do {
		responseData = await goToWebinarApiRequest.call(this, method, endpoint, qs, body);

		if (responseData.page && parseInt(responseData.page.totalElements, 10) === 0) {
			return [];
		} else if (responseData._embedded && responseData._embedded[key]) {
			returnData.push(...responseData._embedded[key]);
		} else {
			returnData.push(...responseData);
		}

		if (qs.limit && returnData.length >= qs.limit) {
			returnData = returnData.splice(0, qs.limit as number);
			return returnData;
		}

	} while (
		responseData.totalElements && parseInt(responseData.totalElements, 10) > returnData.length
	);

	return returnData;
}

export async function handleGetAll(
	this: IExecuteFunctions,
	endpoint: string,
	qs: IDataObject,
	body: IDataObject,
	resource: string) {
	const returnAll = this.getNodeParameter('returnAll', 0) as boolean;

	if (!returnAll) {
		qs.limit = this.getNodeParameter('limit', 0) as number;
	}

	return await goToWebinarApiRequestAllItems.call(this, 'GET', endpoint, qs, body, resource);
}

export async function loadWebinars(this: ILoadOptionsFunctions) {
	const { oauthTokenData } = this.getCredentials('goToWebinarOAuth2Api') as {
		oauthTokenData: { account_key: string }
	};

	const endpoint = `accounts/${oauthTokenData.account_key}/webinars`;

	const qs = {
		fromTime: moment().subtract(1, 'years').format(),
		toTime: moment().add(1, 'years').format(),
	};

	const resourceItems = await goToWebinarApiRequestAllItems.call(this, 'GET', endpoint, qs, {}, 'webinar');

	const returnData: INodePropertyOptions[] = [];

	resourceItems.forEach((item) => {
		returnData.push({
			name: item.subject as string,
			value: item.webinarKey as string,
		});
	});

	return returnData;
}

// tslint:disable-next-line: no-any
function convertLosslessNumber(key: any, value: any) {
	if (value && value.isLosslessNumber) {
		return value.toString();
	}
	else {
		return value;
	}
}