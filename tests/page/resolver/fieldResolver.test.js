import React from 'react';
import { expect } from 'chai';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import resolver from '../../../src/page/resolver/fieldResolver.js';

configure({ adapter: new Adapter() });

describe('page/resolver/field', () => {
  it('is a function', () => {
    expect(resolver).to.be.a('function');
  });

  it('throws an exception when passed argument is invalid', () => {
    expect(() => resolver()).to.throw();
  });

  it('returns a component containing input element with type `text` when `text` argument passed', () => {
    const Input = resolver('text');
    const wrapper = shallow(<Input />);

    expect(wrapper.containsMatchingElement(<input type="text" />)).to.equal(true);
  });

  it('returns a component containing input element with type `email` when `email` argument passed', () => {
    const Input = resolver('email');
    const wrapper = shallow(<Input />);

    expect(wrapper.containsMatchingElement(<input type="email" />)).to.equal(true);
  });

  it('returns a component containing input element with type `number` when `number` argument passed', () => {
    const Input = resolver('number');
    const wrapper = shallow(<Input />);

    expect(wrapper.containsMatchingElement(<input type="number" />)).to.equal(true);
  });

  it('returns a component containing input element with type `password` when `password` argument passed', () => {
    const Input = resolver('password');
    const wrapper = shallow(<Input />);

    expect(wrapper.containsMatchingElement(<input type="password" />)).to.equal(true);
  });

  it('returns a component containing input element with type `date` when `date` argument passed', () => {
    const Input = resolver('date');
    const wrapper = shallow(<Input />);

    expect(wrapper.containsMatchingElement(<input type="date" />)).to.equal(true);
  });

  it('returns a component containing input element with type `datetime` when `datetime` argument passed', () => {
    const Input = resolver('datetime');
    const wrapper = shallow(<Input />);

    expect(wrapper.containsMatchingElement(<input type="datetime" />)).to.equal(true);
  });

  it('returns a component containing input element with type `file` when `file` argument passed', () => {
    const Input = resolver('file');
    const wrapper = shallow(<Input />);

    expect(wrapper.containsMatchingElement(<input type="file" />)).to.equal(true);
  });

  it('returns a component containing textarea element when `textarea` argument passed', () => {
    const Input = resolver('textarea');
    const wrapper = shallow(<Input />);

    expect(wrapper.containsMatchingElement(<textarea />)).to.equal(true);
  });

  it('returns a component containing button element with type `submit` when `submit` argument passed', () => {
    const Input = resolver('submit');
    const wrapper = shallow(<Input />);

    expect(wrapper.containsMatchingElement(<button type="submit" />)).to.equal(true);
  });
});
