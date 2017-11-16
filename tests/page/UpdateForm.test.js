import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { expect } from 'chai';
import { spy } from 'sinon';

import Form, { updateFormWrapper } from '../../src/page/UpdateForm.js'
import testGenerator from './form/formTestGenerator.js';

configure({ adapter: new Adapter() });
testGenerator(Form, 'page/UpdateForm');

const baseProps = {
  config: { form: {} },
};

const buildComponentInstance = (props = {}) =>
  new (updateFormWrapper('div'))({ ...baseProps, ...props });

describe('page/UpdateForm', () => {
  it('passes `initialValues` prop to wrapped component', () => {
    const componentSpy = spy(() => <div />);
    const UpdateForm = updateFormWrapper(componentSpy);

    const wrapper = mount((
      <UpdateForm
        config={ { form: {
          field1: { data: 'a' },
          field2: { data: 'b' },
        } } }
      />
    ));

    const wrappedComponentProps = componentSpy.getCall(0).args[0];
    expect(wrappedComponentProps).to.have.property('initialValues');
    expect(wrappedComponentProps.initialValues).to.deep.equal({
      field1: 'a',
      field2: 'b',
    });
  });
});

describe('page/UpdateForm.getInitialValues', () => {
  it('is a function', () => {
    const instance = buildComponentInstance();

    expect(instance.getInitialValues).to.be.a('function');
  });

  it('returns an object', () => {
    const instance = buildComponentInstance();

    expect(instance.getInitialValues()).to.be.an('object');
  });

  it('returns an object with values of fields defined in `config`', () => {
    const fieldsConfig = {
      field1: { data: 'a' },
      field2: { data: 'b' },
    };
    const instance = buildComponentInstance({ config: { form: fieldsConfig } });

    expect(instance.getInitialValues()).to.deep.equal({
      field1: 'a',
      field2: 'b',
    });
  });
});
