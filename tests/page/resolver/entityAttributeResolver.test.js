import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import resolver from '../../../src/page/resolver/entityAttributeResolver.js';
import FlatFieldDescription from '../../../src/page/resolver/field/FlatFieldDescription.js';

const flatCaseGenerator = type => {
  it('returns `FlatFieldDescription` component when passed argument is ' + type, () => {
    expect(resolver(type)).to.equal(FlatFieldDescription);
  });
};

const flatTypes = [
  'date',
  'datetime',
  'email',
  'number',
  'text',
];

describe('page/resolver/entityAttribute', () => {
  it('is a function', () => {
    expect(resolver).to.be.a('function');
  });

  it('throws an exception when passed argument is invalid', () => {
    expect(() => resolver()).to.throw();
  });

  for (let i in flatTypes) {
    flatCaseGenerator(flatTypes[i]);
  }
});
