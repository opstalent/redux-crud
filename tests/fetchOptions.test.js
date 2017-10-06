import { expect } from 'chai';
import { spy } from 'sinon';

import fetchOptions from '../src/fetchOptions.js';
import {
  OPTIONS_LOADED_TYPE,
  OPTIONS_LOAD_FAILED_TYPE,
} from '../src/actions.js'

const clientMocker = (passed, response = {}) => 
  spy(config => new Promise((resolve, reject) => {
    passed ? resolve(response) : reject({ response });
  }));

const dispatchMocker = () => spy(() => {});

const asyncAssert = (callback, done) => () => {
  try {
    callback();
    done();
  } catch (err) {
    done(err);
  }
}

describe('fetchOptions', () => {
  it('calls client once', () => {
    const clientSpy = clientMocker(true);
    const dispatch = dispatchMocker();

    fetchOptions('someUrl', dispatch, clientSpy);
    expect(clientSpy.called).to.equal(true);
    expect(clientSpy.callCount).to.equal(1);
  });

  it('calls client with passed url', () => {
    const clientSpy = clientMocker(false);
    const dispatch = dispatchMocker();

    fetchOptions('notJustAnUrl', dispatch, clientSpy);
    expect(clientSpy.getCall(0).args[0]).to.have.property('url', 'notJustAnUrl');
  });

  it('calls client with method OPTIONS', () => {
    const clientSpy = clientMocker(false);
    const dispatch = dispatchMocker();

    fetchOptions('notJustAnUrl', dispatch, clientSpy);
    expect(clientSpy.getCall(0).args[0]).to.have.property('method', 'options');
  });

  it('raises OPTIONS_LOADED_TYPE action with proper payload when client resolved', (done) => {
    const client = clientMocker(true, { someKey: 'someVar' });
    const dispatch = dispatchMocker();

    fetchOptions('ourUrlIsAwesome', dispatch, client)
      .then(asyncAssert(() => {
        expect(dispatch.callCount).to.equal(1);
        expect(dispatch.getCall(0).args[0]).to.have.property('type', OPTIONS_LOADED_TYPE);
        expect(dispatch.getCall(0).args[0]).to.have.deep.property('payload', {
          response: { someKey: 'someVar' },
          namespace: 'ourUrlIsAwesome',
        });
      }, done), done);
  });

  it('raises OPTIONS_LOAD_FAILED_TYPE action with proper payload when client rejected', (done) => {
    const client = clientMocker(false, { someKey: 'someVar' });
    const dispatch = dispatchMocker();

    fetchOptions('ourUrlIsAwesome', dispatch, client)
      .then(asyncAssert(() => {
        expect(dispatch.callCount).to.equal(1);
        expect(dispatch.getCall(0).args[0]).to.have.property('type', OPTIONS_LOAD_FAILED_TYPE);
        expect(dispatch.getCall(0).args[0]).to.have.deep.property('payload', {
          response: { someKey: 'someVar' },
          namespace: 'ourUrlIsAwesome',
        });
      }, done), done);
  });
});
