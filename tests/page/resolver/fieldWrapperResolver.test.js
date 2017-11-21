import React from 'react';
import { configure, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { expect } from 'chai';

import wrapper from '../../../src/page/resolver/fieldWrapperResolver.js';

configure({ adapter: new Adapter() });

describe('page/resolver/fieldWrapperResolver', () => {
  it('is a function', () => {
    expect(wrapper).to.be.a('function');
  });

  it('throws an exception when passed argument is invalid', () => {
    expect(() => wrapper()).to.throw();
  });

  it('returns a component with `div` tag as top level container when passed argument is `form`', () => {
    const Component = wrapper('form');
    const element = render(<Component />);

    expect(element.is('div')).to.equal(true);
  });

  it('returns a component which contains `label` element when passed argument is `form`', () => {
    const Component = wrapper('form');
    const element = shallow(<Component label="Some label" field="fieldName" />);

    expect(element.containsMatchingElement(<label htmlFor="fieldName">Some label</label>)).to.equal(true);
  });
});
