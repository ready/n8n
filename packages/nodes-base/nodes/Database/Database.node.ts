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

export class Database implements INodeType {
  description: INodeTypeDescription = {
		displayName: 'Database',
    name: 'database',
		icon: 'file:Database.svg',
		group: ['input'],
		version: 1,
		description: 'Adds data to the databse',
		defaults: {
			name: 'Database',
			color: '#E10098',
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
				displayName: 'Query',
				name: 'query',
				type: 'json',
				default: '',
				description: 'GraphQL query',
				required: true,
			},
			{
				displayName: 'Variables',
				name: 'variables',
				type: 'json',
				default: '',
				description: 'Query variables',
			},
		],
	};

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

    const items = this.getInputData();

    const returnItems: INodeExecutionData[] = [];
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      returnItems.push({
        json: {
          alert: 'Calix alert'
        }
      })
		}

		return this.prepareOutputData(returnItems);
  }
}
