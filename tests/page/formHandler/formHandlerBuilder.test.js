import { expect } from 'chai';

import Builder from '../../../src/page/formHandler/formHandlerBuilder.js';

describe('page/formHandler/formHandlerBuilder', () => {
  it('is a function', () => {
    expect(Builder).to.be.a('function');
  });
});

describe('page/formHandler/formHandlerBuilder.build', () => {
  it('is a function', () => {
    const builder = new Builder();

    expect(builder.build).to.be.a('function');
  });

  it('returns a function', () => {
    const builder = new Builder();

    expect(builder.build()).to.be.a('function');
  });

  it('returns a function with `url` property passed from `setUrl` method', () => {
    const builder = new Builder();
    builder.setUrl('some/url');

    const handler = builder.build();

    expect(handler).to.have.property('url');
    expect(handler.url).to.equal('some/url');
  });

  it('returns a function with `method` property passed from `setMethod` method', () => {
    const builder = new Builder();
    builder.setMethod('GET');

    const handler = builder.build();

    expect(handler).to.have.property('method');
    expect(handler.method).to.equal('GET');
  });

  it('returns a function with `baseUrl` property passed from `setBaseUrl` method', () => {
    const builder = new Builder();
    builder.setBaseUrl('someUrl');

    const handler = builder.build();

    expect(handler).to.have.property('baseUrl');
    expect(handler.baseUrl).to.equal('someUrl');
  });

  it('returns a function with `dispatcher` property passed from `setDispatcher` method', () => {
    const builder = new Builder();
    builder.setDispatcher('someDispatcher?');

    const handler = builder.build();

    expect(handler).to.have.property('dispatcher');
    expect(handler.dispatcher).to.equal('someDispatcher?');
  });
});

describe('page/formHandler/formHandlerBuilder.setUrl', () => {
  it('is a function', () => {
    const builder = new Builder();

    expect(builder.setUrl).to.be.a('function');
  });

  it('is setting given value to property `url`', () => {
    const builder = new Builder();

    builder.setUrl(2);
    expect(builder.url).to.equal(2);
  });
});

describe('page/formHandler/formHandlerBuilder.setBaseUrl', () => {
  it('is a function', () => {
    const builder = new Builder();

    expect(builder.setBaseUrl).to.be.a('function');
  });

  it('is setting given value to property `baseUrl`', () => {
    const builder = new Builder();

    builder.setBaseUrl(2);
    expect(builder.baseUrl).to.equal(2);
  });
});

describe('page/formHandler/formHandlerBuilder.setMethod', () => {
  it('is a function', () => {
    const builder = new Builder();

    expect(builder.setMethod).to.be.a('function');
  });

  it('is setting given value to property `url`', () => {
    const builder = new Builder();

    builder.setMethod(2);
    expect(builder.method).to.equal(2);
  });
});

describe('page/formHandler/formHandlerBuilder.setDispatcher', () => {
  it('is a function', () => {
    const builder = new Builder();

    expect(builder.setDispatcher).to.be.a('function');
  });

  it('is setting given value to property `dispatcher`', () => {
    const builder = new Builder();

    builder.setDispatcher(2);
    expect(builder.dispatcher).to.equal(2);
  });
});
