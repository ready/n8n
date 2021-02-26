import {
  IExecuteFunctions,
} from 'n8n-core';

import {
  IDataObject,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

import { OptionsWithUri } from 'request';
import { RequestPromiseOptions } from 'request-promise-native';

export class Error implements INodeType {
  description: INodeTypeDescription = {
		displayName: 'Error',
    name: 'error',
		icon: 'file:Error.svg',
		group: ['input'],
		version: 1,
		description: 'Retrieves data from calix',
		defaults: {
			name: 'Error',
			color: '#5A5A89',
		},
		inputs: ['main'],
		outputs: ['main'],
    credentials: [
      {
        name: 'readyApi',
        required: true,
      }
    ],
		properties: [
			{
				displayName: 'Error',
				name: 'error',
				type: 'string',
				default: '',
				description: 'error',
				required: true,
			},
		],
	};

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

    const items = this.getInputData();

    const credentials = this.getCredentials('readyApi') as IDataObject;

    let requestOptions: OptionsWithUri & RequestPromiseOptions;

    const returnItems: INodeExecutionData[] = [];
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      returnItems.push({
        json: {
          alert: 'Error'
        }
      })
		}

		return this.prepareOutputData(returnItems);
  }
}
