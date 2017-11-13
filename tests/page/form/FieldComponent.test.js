import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { expect } from 'chai';
import { spy } from 'sinon';

import Field from '../../../src/page/form/FieldComponent';

configure({ adapter: new Adapter() });

const baseProps = {
  config: {
    label: 'Some label',
    wrapperType: 'add',
    type: 'text',
  },
  input: {
    name: 'Some name',
  },
};

describe('page/form/FieldComponent', () => {
  it('is mountable', () => {
    expect(() => shallow(<Field { ...baseProps } />)).to.not.throw();
  });

  it('uses `fieldWrapper` from `templateResolver` prop to mount field\'s wrapper', () => {
    const wrapperSpy = spy(() => <div className="wrapper" />);
    const props = {
      ...baseProps,
      templateResolver: {
        fieldWrapper: () => wrapperSpy,
        field: () => () => <input />,
      },
    };

    mount(<Field { ...props } />);
    expect(wrapperSpy.called).to.equal(true);
  });

  it('is passing input name to wrapper resolved by `templateResolver`', () => {
    const wrapperSpy = spy(() => <div className="wrapper" />);
    const props = {
      ...baseProps,
      templateResolver: {
        fieldWrapper: () => wrapperSpy,
        field: () => () => <input />,
      },
    };

    mount(<Field { ...props } />);
    const wrapperProps = wrapperSpy.getCall(0).args[0];

    expect(wrapperProps).to.have.property('field', baseProps.input.name);
  });

  it('is passing label to wrapper resolved by `templateResolver`', () => {
    const wrapperSpy = spy(() => <div className="wrapper" />);
    const props = {
      ...baseProps,
      templateResolver: {
        fieldWrapper: () => wrapperSpy,
        field: () => () => <input />,
      },
    };

    mount(<Field { ...props } />);
    const wrapperProps = wrapperSpy.getCall(0).args[0];

    expect(wrapperProps).to.have.property('label', baseProps.config.label);
  });

  it('uses `field` from `templateResolver` prop to mount field', () => {
    const fieldSpy = spy(() => <input />);
    const props = {
      ...baseProps,
      templateResolver: {
        fieldWrapper: () => ({ children }) => <div>{ children }</div>,
        field: () => fieldSpy,
      },
    };

    mount(<Field { ...props } />);
    expect(fieldSpy.called).to.equal(true);
  });

  it('is passing config variables to field resolved by `templateResolver`', () => {
    const fieldSpy = spy(() => <input />);

    const configVariables = {
      someKey: 'someValue',
    };

    const props = {
      ...baseProps,
      config: {
        ...baseProps.config,
        ...configVariables,
      },
      templateResolver: {
        fieldWrapper: () => ({ children }) => <div>{ children }</div>,
        field: () => fieldSpy,
      },
    };

    mount(<Field { ...props } />);
    const fieldProps = fieldSpy.getCall(0).args[0];

    expect(fieldProps).to.have.property('config');
    expect(fieldProps.config).to.deep.include(configVariables);
  });
});
