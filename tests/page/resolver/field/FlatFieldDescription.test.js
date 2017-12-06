import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import FieldDescription from '../../../../src/page/resolver/field/FlatFieldDescription.js';

const baseProps = {
  config: {
    label: 'Label',
  },
};

const mountComponent = (props = {}) => mount(<FieldDescription { ...baseProps } { ...props } />);

describe('page/resolver/field/FlatFieldDescription', () => {
  it('is renderable', () => {
    expect(mountComponent).to.not.throw();
  });

  it(`returns component containing \`dd\` and \`dt\` html tags`, () => {
    const wrapper = mountComponent();

    expect(wrapper.find('dd').length).to.be.above(0);
    expect(wrapper.find('dt').length).to.be.above(0);
  });

  it(`returns component which contains value of \`config.label\` props inside of \`dd\` html tag`, () => {
    const wrapper = mountComponent({
      config: {
        label: 'Some label',
      },
    });

    expect(wrapper.find('dt').text()).to.equal('Some label');
  });

  it(`returns component which contains value of \`value\` prop inside of \`dt\` html tag`, () => {
    const wrapper = mountComponent({ value: 'Just a value' });

    expect(wrapper.find('dd').text()).to.equal('Just a value');
  });
});
