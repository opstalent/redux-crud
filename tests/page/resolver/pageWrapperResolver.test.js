import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import wrapper from '../../../src/page/resolver/pageWrapperResolver.js';

configure({ adapter: new Adapter() });

describe('page/resolver/pageWrapperResolver', () => {
  it('is a function', () => {
    expect(wrapper).to.be.a('function');
  });

  it('throws an exception when passed argument is invalid', () => {
    expect(() => wrapper()).to.throw();
  });

  it('returns component which contains `form` tag when passed argument is `form`', () => {
    const Component = wrapper('form');
    const rendered = mount(<Component />);

    expect(rendered.find('form').length).to.be.above(0);
  });

  it('returns component which contains `div` tag when passed argument is `show`', () => {
    const Component = wrapper('show');
    const rendered = mount(<Component />);

    expect(rendered.childAt(0).is('dl')).to.be.equal(true);
  });
});
