import { expect } from 'chai';

import wrapper from '../../../src/page/resolver/pageWrapperResolver.js';

describe('page/resolver/pageWrapperResolver', () => {
  it('is a function', () => {
    expect(wrapper).to.be.a('function');
  });

  it('throws an exception when passed argument is invalid', () => {
    expect(() => wrapper()).to.throw();
  });

  it('returns `form` component when passed argument is `add`', () => {
    expect(wrapper('add')).to.equal('form');
  });
});
