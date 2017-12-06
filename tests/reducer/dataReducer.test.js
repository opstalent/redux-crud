import { expect } from 'chai';

import reducerTestCaseGenerator from './reducerTestCaseGenerator.js';
import dataReducer from '../../src/reducer/dataReducer.js';

import {
  DATA_DOWNLOAD_SUCCEEDED_TYPE,
  DATA_DOWNLOAD_FAILED_TYPE,
} from '../../src/actions.js';

const reducerTest = reducerTestCaseGenerator(dataReducer);

describe('reducer/dataReducer', () => {
  it('is a function', () => {
    expect(dataReducer).to.be.a('function');
  });

  it('returns given state if not handled action type provided', reducerTest(
    'SOME_DUMMY_ACTION',
    { someKey: 'somePayload' },
    { someKey: 'someValue' },
    { someKey: 'someValue' },
  ));

  it('returns state with response assigned to namespace key when action is DATA_DOWNLOAD_SUCCEEDED', reducerTest(
    DATA_DOWNLOAD_SUCCEEDED_TYPE,
    {
      response: { someKey: 'someValue' },
      namespace: 'someNamespace',
    },
    {
      someAnotherNamespace: { a: 1, b: 2 },
      someNamespace: { someKey: 'someAnotherValue' },
    },
    {
      someAnotherNamespace: { a: 1, b: 2 },
      someNamespace: { someKey: 'someValue' },
    }
  ));

  it('returns state with response assigned to namespace key when action is DATA_DOWNLOAD_FAILED', reducerTest(
    DATA_DOWNLOAD_FAILED_TYPE,
    {
      response: { someKey: 'someValue' },
      namespace: 'someNamespace',
    },
    {
      someAnotherNamespace: { a: 1, b: 2 },
      someNamespace: { someKey: 'someAnotherValue' },
    },
    {
      someAnotherNamespace: { a: 1, b: 2 },
      someNamespace: { someKey: 'someValue' },
    }
  ));
});
