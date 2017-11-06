import React, { Component } from 'react';
import { expect } from 'chai';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import generator from '../../../../src/page/resolver/field/inputGenerator.js';

configure({ adapter: new Adapter() });

const isComponent = component =>
  ['string', 'function'].indexOf(typeof component) !== -1 || component instanceof Component;

describe('page/resolver/field/inputGenerator', () => {
  it('is a function', () => {
    expect(generator).to.be.a('function');
  });

  it('returns React component', () => {
    const component = generator();

    expect(isComponent(generator())).to.equal(true);
  });

  it('returns React component containing `input` tag', () => {
    const Input = generator();
    const wrapper = shallow(<Input />);

    expect(wrapper.containsMatchingElement(<input />)).to.equal(true);
  });

  it('returns React component containing `input` tag with type prop equal to argument passed to generator', () => {
    const Input = generator('text');
    const wrapper = shallow(<Input />);

    expect(wrapper.containsMatchingElement(<input type="text" />)).to.equal(true);
  });

  it('returns React component containing `input` tag which is passing its props into `input`', () => {
    const Input = generator('someType');
    const wrapper = shallow(<Input someProp="someValue" type="type" />);

    expect(wrapper.containsMatchingElement(<input someProp="someValue" type="someType" />)).to.equal(true);
  });

  it('returns React component containing `input` with predefined props given as argument', () => {
    const Input = generator('someType', {
      justProp: 'prop',
      type: 'type',
    });

    const wrapper = shallow(<Input justProp="anotherValue" />);

    expect(wrapper.containsMatchingElement(<input justProp="prop" type="someType" />)).to.equal(true);
  });
});
