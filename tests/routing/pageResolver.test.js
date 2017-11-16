import { expect } from 'chai';

import CreateForm from '../../src/page/CreateForm.js';
import UpdateForm from '../../src/page/UpdateForm.js';
import resolver from '../../src/routing/pageResolver.js';

describe('routing/pageResolver', () => {
  it('is a function', () => {
    expect(resolver).to.be.a('function');
  });

  it('throws an exception when given type is not valid', () => {
    expect(() => resolver()).to.throw();
  });

  it('returns `CreateForm` component when given type is `add`', () => {
    expect(resolver('add')).to.equal(CreateForm);
  });

  it('returns `UpdateForm` component when given type is `edit`', () => {
    expect(resolver('edit')).to.equal(UpdateForm);
  });
});
