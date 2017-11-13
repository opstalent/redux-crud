import { expect } from 'chai';
import { spy } from 'sinon';

import asyncAssert from '../../asyncAssert.js';
import httpClientMocker from '../../httpClientMocker.js';

import { FORM_SUBMISSION_SUCCEEDED_TYPE, FORM_SUBMISSION_FAILED_TYPE } from '../../../src/actions.js';
import Handler from '../../../src/page/form/formHandler.js';

describe('page/formHandler/formHandler', () => {
  it('is a function', () => {
    expect(Handler).to.be.a('function');
  });

  it('returns a function', () => {
    expect(new Handler({})).to.be.a('function');
  });

  it('returns a function with `url` property passed as constructor\'s `config` argument', () => {
    const handler = new Handler({ url: 'someUrl' });

    expect(handler).to.have.property('url');
    expect(handler.url).to.equal('someUrl');
  });

  it('returns a function with `baseUrl` property passed as constructor\'s `config` argument', () => {
    const handler = new Handler({ baseUrl: 'somebaseUrl' });

    expect(handler).to.have.property('baseUrl');
    expect(handler.baseUrl).to.equal('somebaseUrl');
  });

  it('returns a function with `method` property passed as constructor\'s `config` argument', () => {
    const handler = new Handler({ method: 'POST' });

    expect(handler).to.have.property('method');
    expect(handler.method).to.equal('POST');
  });

  it('returns a function with `dispatcher` property passed as constructor\'s `dispatcher` argument', () => {
    const dispatcher = () => {};
    const handler = new Handler({}, dispatcher);

    expect(handler).to.have.property('dispatcher');
    expect(handler.dispatcher).to.equal(dispatcher);
  });

  it('returns a function which calls `httpClient` once', () => {
    const handler = new Handler({});

    handler.httpClient = httpClientMocker(true);
    handler();

    expect(handler.httpClient.called).to.equal(true);
    expect(handler.httpClient.callCount).to.equal(1);
  });

  it('returns a function which calls `httpClient` with `method` config param passed by constructor', () => {
    const handler = new Handler({ method: 'POST' });

    handler.httpClient = httpClientMocker(true);
    handler();

    const configArg = handler.httpClient.getCall(0).args[0];
    expect(configArg).to.have.property('method');
    expect(configArg.method).to.equal('POST');
  });

  it('returns a function which calls `httpClient` with `baseUrl` config param passed by constructor', () => {
    const handler = new Handler({ baseUrl: 'http://someUrl' });

    handler.httpClient = httpClientMocker(true);
    handler();

    const configArg = handler.httpClient.getCall(0).args[0];
    expect(configArg).to.have.property('baseUrl');
    expect(configArg.baseUrl).to.equal('http://someUrl');
  });

  it('returns a function which calls `httpClient` with `url` config param passed by constructor', () => {
    const handler = new Handler({ url: 'someUrl' });

    handler.httpClient = httpClientMocker(true);
    handler();

    const configArg = handler.httpClient.getCall(0).args[0];
    expect(configArg).to.have.property('url');
    expect(configArg.url).to.equal('someUrl');
  });

  it('returns a function which calls `httpClient` with `data` given by param', () => {
    const handler = new Handler({});
    const someData = {
      field1: 'value1',
      deepField: {
        subfield1: 'subvalue1',
      },
    };

    handler.httpClient = httpClientMocker(true);
    handler(someData);

    const configArg = handler.httpClient.getCall(0).args[0];
    expect(configArg).to.have.property('data');
    expect(configArg.data).to.deep.equal(someData);
  });

  it('returns a function which calls `dispatcher` exactly once', (done) => {
    const dispatcherSpy = spy(() => {});
    const handler = new Handler({}, dispatcherSpy);

    handler.httpClient = httpClientMocker(true);
    handler().then(asyncAssert(() => {
      expect(dispatcherSpy.called).to.equal(true);
      expect(dispatcherSpy.callCount).to.equal(1);
    }, done), done);
  });

  it('returns a function which calls `dispatcher` with `config` inside of payload', (done) => {
    const config = {
      someVar: 'someValue',
      someObject: {},
    }
    const dispatcherSpy = spy(() => {});
    const handler = new Handler(config, dispatcherSpy);

    handler.httpClient = httpClientMocker(true);
    handler().then(asyncAssert(() => {
      expect(dispatcherSpy.getCall(0).args[0]).to.have.property('payload');
      expect(dispatcherSpy.getCall(0).args[0].payload).to.have.deep.property('config', config);
    }, done), done);
  });

  it('returns a function which raises FORM_SUBMISSION_SUCCEEDED_TYPE action with response inside of payload when submission has succeeded', (done) => {
    const response = { someKey: 'someValue' };
    const dispatcherSpy = spy(() => {});
    const handler = new Handler({}, dispatcherSpy);

    handler.httpClient = httpClientMocker(true, response);
    handler().then(asyncAssert(() => {
      expect(dispatcherSpy.getCall(0).args[0]).to.have.property('type', FORM_SUBMISSION_SUCCEEDED_TYPE);
      expect(dispatcherSpy.getCall(0).args[0].payload).to.have.deep.property('response', response);
    }, done), done);
  });

  it('returns a function which raises FORM_SUBMISSION_FAILED_TYPE action with response inside of payload when submission has failed', (done) => {
    const response = { someKey: 'someValue' };
    const dispatcherSpy = spy(() => {});
    const handler = new Handler({}, dispatcherSpy);

    handler.httpClient = httpClientMocker(false, response);
    handler().then(asyncAssert(() => {
      expect(dispatcherSpy.getCall(0).args[0]).to.have.property('type', FORM_SUBMISSION_FAILED_TYPE);
      expect(dispatcherSpy.getCall(0).args[0].payload).to.have.deep.property('response', response);
    }, done), done);
  });

  it('returns a function which returns a promise', () => {
    const handler = new Handler({});

    handler.httpClient = httpClientMocker(true);

    const promise = handler();
    expect(promise).to.be.an.instanceof(Promise);
  });
});

describe('page/formHandler/formHandler.httpClient', () => {
  it('is a function', () => {
    const handler = new Handler({});
    expect(handler.httpClient).to.be.a('function');
  });

  it('returns a promise', () => {
    const handler = new Handler({});
    const promise = handler.httpClient();

    expect(promise).to.be.an.instanceof(Promise);

    promise.catch(() => {}); // supress not catched promise prompt
  });
});
