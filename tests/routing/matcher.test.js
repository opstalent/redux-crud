import { expect } from 'chai';

import matcher from '../../src/routing/matcher.js';

const collection = [
  { path: '/some/path', exact: true, strict: false },
  { path: '/another/path', exact: false, strict: false },
];

describe('routing/matcher', () => {
  it('is a function', () => {
    expect(matcher).to.be.a('function');
  });

  it('throws exception when given collection is not an array', () => {
    expect(() => matcher('something', null)).to.throw(TypeError);
  });

  it('returns an object when any item from given collection matches an URL', () => {
    expect(matcher('/some/path', collection)).to.be.an('object');
  });

  it('throws exception when no item from given collection matches an URL', () => {
    expect(() => matcher('/not/matching/path', collection)).to.throw(Error);
  });

  it('returns an object from given collection which is matching to given URL', () => {
    expect(matcher('/another/path/2', collection)).to.be.deep.equal(collection[1]);
  });
});
