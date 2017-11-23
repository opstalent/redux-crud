import { expect } from 'chai';

import reducerTestCaseGenerator from './reducerTestCaseGenerator.js';
import optionsReducer from '../../src/reducer/optionsReducer.js';

import {
  OPTIONS_LOADED_TYPE,
  OPTIONS_LOAD_FAILED_TYPE,
} from '../../src/actions.js';

const reducerTest = reducerTestCaseGenerator(optionsReducer);

describe('reducer.options', () => {
  it('returns proper state structure on OPTIONS_LOADED action', reducerTest(
    OPTIONS_LOADED_TYPE,
    {
      namespace: 'someNamespace',
      response: { var1: 'someValue' },
    },
    {},
    { someNamespace: { var1: 'someValue' } }
  ));

  it('returns proper state structure on OPTIONS_LOAD_ERROR action', reducerTest(
    OPTIONS_LOAD_FAILED_TYPE,
    {
      namespace: 'someNamespace',
      response: { var1: 'someError' },
    },
    {},
    { someNamespace: { var1: 'someError' }}
  ));

  it('overrides previous state properly on OPTIONS_LOADED action', reducerTest(
    OPTIONS_LOADED_TYPE,
    {
      namespace: 'someNamespace',
      response: { var1: 'someValue' },
    },
    { someAnotherNamespace: { var3: 'something' } },
    {
      someNamespace: { var1: 'someValue' },
      someAnotherNamespace: { var3: 'something' },
    }
  ));

  it('overrides previous state properly on OPTIONS_LOAD_FAILED action', reducerTest(
    OPTIONS_LOAD_FAILED_TYPE,
    {
      namespace: 'someNamespace',
      response: { var1: 'someValue' },
    },
    { someAnotherNamespace: { var3: 'something' } },
    {
      someNamespace: { var1: 'someValue' },
      someAnotherNamespace: { var3: 'something' },
    }
  ));

  it('returns previous state on DUMMY action', reducerTest(
    'DUMMY',
    { anything: 'justAnything' },
    { somePreviousKey: 'somePreviousValue' },
    { somePreviousKey: 'somePreviousValue' }
  ));

  it('overrides a duplicated state key on OPTIONS_LOADED action', reducerTest(
    OPTIONS_LOADED_TYPE,
    {
      namespace: 'someNamespace',
      response: 'someResponse',
    },
    {
      someNamespace: 'somePreviousResponse',
      anotherNamespace: 'someValue',
    },
    {
      someNamespace: 'someResponse',
      anotherNamespace: 'someValue',
    }
  ));

  it('overrides a duplicated state key on OPTIONS_LOAD_FAILED action', reducerTest(
    OPTIONS_LOAD_FAILED_TYPE,
    {
      namespace: 'someNamespace',
      response: 'someResponse',
    },
    {
      someNamespace: 'somePreviousResponse',
      anotherNamespace: 'someValue',
    },
    {
      someNamespace: 'someResponse',
      anotherNamespace: 'someValue',
    }
  ));

  it('returns object if previous state is an object', () => {
    const action = {};

    expect(optionsReducer({}, action)).to.be.an('object');
  });
});
