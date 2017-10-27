import { expect } from 'chai';

import resolver from '../../src/page/resolverContainer.js';

describe('page/resolver', () => {
  it('is an object', () => {
    expect(resolver).to.be.an('object');
  });

  it('contains key `wrapper`', () => {
    expect(resolver).to.have.property('wrapper');
  });

  it('value of attribute `wrapper` is a function', () => {
    expect(resolver.wrapper).to.be.a('function');
  });

  it('contains key `field`', () => {
    expect(resolver).to.have.property('field');
  });

  it('value of attribute `field` is a function', () => {
    expect(resolver.field).to.be.a('function');
  });
});
