import { expect } from 'chai';

import reducerTestCaseGenerator from './reducerTestCaseGenerator.js';
import entityDataReducer from '../../src/reducer/entityDataReducer.js';

import {
  ENTITY_DATA_DOWNLOAD_SUCCEEDED_TYPE,
  ENTITY_DATA_DOWNLOAD_FAILED_TYPE,
} from '../../src/actions.js';

const reducerTest = reducerTestCaseGenerator(entityDataReducer);

describe('reducer/.entityDataReducer', () => {
  it('is a function', () => {
    expect(entityDataReducer).to.be.a('function');
  });

  it('returns given state if not handled action type provided', reducerTest(
    'SOME_DUMMY_ACTION',
    { someKey: 'somePayload' },
    { someKey: 'someValue' },
    { someKey: 'someValue' },
  ));

  it('returns state with response assigned to namespace key when action is ENTITY_DATA_DOWNLOAD_SUCCEEDED', reducerTest(
    ENTITY_DATA_DOWNLOAD_SUCCEEDED_TYPE,
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

  it('returns state with response assigned to namespace key when action is ENTITY_DATA_DOWNLOAD_FAILED', reducerTest(
    ENTITY_DATA_DOWNLOAD_FAILED_TYPE,
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
