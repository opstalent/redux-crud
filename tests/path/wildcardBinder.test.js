import { expect } from 'chai';

import binder from '../../src/path/wildcardBinder.js';

describe('path/wildcardBinder', () => {
  it('is a function', () => {
    expect(binder).to.be.a('function');
  });

  it('returns a string', () => {
    expect(binder()).to.be.a('string');
  });

  it('returns given url when no params defined and curly-bracket based wildcard is used', () => {
    expect(binder('/url/with/{wildcard}')).to.equal('/url/with/{wildcard}');
  });

  it('returns given url when no params defined and colon based wildcard is used', () => {
    expect(binder('/url/with/:wildcard')).to.equal('/url/with/:wildcard');
  });

  it('returns given url binded with given params when colon-based wildcard is used', () => {
    const params = {
      test: 'value',
      id: 3,
    };

    expect(binder('/url/:test/id/:id', params)).to.equal('/url/value/id/3');
  });

  it('returns given url binded with given params when curly-bracet wildcard is used', () => {
    const params = {
      test: 'value',
      id: 3,
    };

    expect(binder('/url/{test}/id/{id}', params)).to.equal('/url/value/id/3');
  });

  it('returns patial-binded url when not all params are given and colon-based wildcard is used', () => {
    const params = {
      test: 'value',
    };

    expect(binder('/someurl/:test/id/:id', params)).to.equal('/someurl/value/id/:id');
  });

  it('returns patial-binded url when not all params are given and curly-bracket based wildcard is used', () => {
    const params = {
      test: 'value',
    };

    expect(binder('/url/{test}/id/{id}', params)).to.equal('/url/value/id/{id}');
  });
});
