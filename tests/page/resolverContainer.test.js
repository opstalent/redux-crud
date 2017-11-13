import { expect } from 'chai';

import resolver from '../../src/page/resolverContainer.js';

describe('page/resolverContainer', () => {
  it('is an object', () => {
    expect(resolver).to.be.an('object');
  });

  it('contains key `pageWrapper`', () => {
    expect(resolver).to.have.property('pageWrapper');
  });

  it('has attribute `pageWrapper` which is a function', () => {
    expect(resolver.pageWrapper).to.be.a('function');
  });

  it('contains key `field`', () => {
    expect(resolver).to.have.property('field');
  });

  it('has attribute `field` which is a function', () => {
    expect(resolver.field).to.be.a('function');
  });

  it('contains key `fieldWrapper`', () => {
    expect(resolver).to.have.property('fieldWrapper');
  });

  it('has attribute `fieldWrapper` which is a function', () => {
    expect(resolver.fieldWrapper).to.be.a('function');
  });
});
