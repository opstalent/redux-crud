import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { expect } from 'chai';
import { spy } from 'sinon';

import Form, { updateFormWrapper } from '../../src/page/UpdateForm.js'

import testGenerator, { baseProps } from './form/formTestGenerator.js';
import httpClientMocker from '../httpClientMocker.js';

const dependencyProps = {
  fetchClient: httpClientMocker(true),
}

configure({ adapter: new Adapter() });
testGenerator(Form, 'page/UpdateForm', { ...baseProps, ...dependencyProps });

const mountComponent = (Component, props = {}) =>
  mount(<Component { ...baseProps } { ...dependencyProps } { ...props } />);

const buildComponentInstance = (props = {}) =>
  new (updateFormWrapper('div'))({ ...baseProps, ...dependencyProps, ...props });

describe('page/UpdateForm', () => {
  it('modifies `match.config.url` prop by binding it with params from `match.params` prop', () => {
    const componentSpy = spy(() => <div />);
    const UpdateForm = updateFormWrapper(componentSpy);
    const props = { ...baseProps };
    props.match.config.url = 'some/config/{test}/a/{id}';
    props.match.params = { test: 'value', id: 3 };

    mountComponent(UpdateForm, props);

    const wrappedComponentProps = componentSpy.getCall(0).args[0];
    expect(wrappedComponentProps).to.have.property('match');
    expect(wrappedComponentProps.match).to.have.property('config');
    expect(wrappedComponentProps.match.config).to.have.property('url');
    expect(wrappedComponentProps.match.config.url).to.equal('some/config/value/a/3');
  });

  it('passes prop given at key `entity` as prop `initialValues`', () => {
    const entity = { a: 1, b: 2, c: 3 };
    const componentSpy = spy(() => <div />);
    const UpdateForm = updateFormWrapper(componentSpy);
    const props = { ...baseProps, entity };

    mountComponent(UpdateForm, props);

    const wrappedComponentProps = componentSpy.getCall(0).args[0];
    expect(wrappedComponentProps).to.have.property('initialValues');
    expect(wrappedComponentProps.initialValues).to.deep.equal(entity);
  });
});
