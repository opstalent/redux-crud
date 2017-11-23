import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { expect } from 'chai';
import { spy } from 'sinon';

import Form, { updateFormWrapper } from '../../src/page/UpdateForm.js'
import testGenerator, { baseProps as formBaseProps } from './form/formTestGenerator.js';
import {
  ENTITY_DATA_DOWNLOAD_SUCCEEDED_TYPE,
  ENTITY_DATA_DOWNLOAD_FAILED_TYPE,
} from '../../src/actions.js';
import httpClientMocker from '../httpClientMocker.js';
import dispatchMocker from '../dispatchMocker.js';
import asyncAssert from '../asyncAssert.js';

const baseProps = {
  ...formBaseProps,
  initialValues: {},
  dispatch: () => {},
  entityData: {},
  fetchClient: () => new Promise(resolve => resolve()),
};

configure({ adapter: new Adapter() });
testGenerator(Form, 'page/UpdateForm', baseProps);

const mountComponent = (Component, props = {}) =>
  mount(<Component { ...baseProps } { ...props } />);

const buildComponentInstance = (props = {}) =>
  new (updateFormWrapper('div'))({ ...baseProps, ...props });

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

  it('passes `initialValues` prop to wrapped component from given prop `entityData`', () => {
    const initialValues = { someValue: 1, someAnotherValue: 2 }
    const componentSpy = spy(() => <div />);
    const UpdateForm = updateFormWrapper(componentSpy);

    const props = {
      ...baseProps,
      entityData: {
        'some/namespace': initialValues,
      },
    };
    props.match.config.url = 'some/namespace';

    mountComponent(UpdateForm, props);

    const wrappedComponentProps = componentSpy.getCall(0).args[0];
    expect(wrappedComponentProps).to.have.property('initialValues');
    expect(wrappedComponentProps.initialValues).to.deep.equal(initialValues);
  });
});

describe('page/UpdateForm.componentDidMount', () => {
  it('is a function', () => {
    const instance = buildComponentInstance();

    expect(instance.componentDidMount).to.be.a('function');
  });

  it('calls `fetchEntityData` of component instance', () => {
    const instance = buildComponentInstance();
    instance.fetchEntityData = spy(instance.fetchEntityData);

    instance.componentDidMount();

    expect(instance.fetchEntityData.callCount).to.equal(1);
  });
});

describe('page/UpdateForm.fetchEntityData', () => {
  it('is a function', () => {
    const instance = buildComponentInstance();

    expect(instance.fetchEntityData).to.be.a('function');
  });

  it('calls function given by `fetchClient` prop exactly once', () => {
    const fetchClient = httpClientMocker(true);
    const instance = buildComponentInstance({ fetchClient });

    instance.fetchEntityData();
    expect(fetchClient.callCount).to.equal(1);
  });

  it('calls function given by `fetchClient` prop with url from `match.config.url` prop binded with params from `match.params` prop', () => {
    const fetchClient = httpClientMocker(true);
    const props = {
      ...baseProps,
      fetchClient,
    };
    props.match.config.url = 'some/config/{test}/a/{id}';
    props.match.params = { test: 'value', id: 3 };

    const instance = buildComponentInstance(props);

    instance.fetchEntityData();
    const fetchConfig = fetchClient.getCall(0).args[0];

    expect(fetchConfig).to.include({ url: 'some/config/value/a/3' });
  });

  it('calls function given by `fetchClient` prop with GET method', () => {
    const fetchClient = httpClientMocker(true);
    const instance = buildComponentInstance({ fetchClient });

    instance.fetchEntityData();
    const fetchConfig = fetchClient.getCall(0).args[0];

    expect(fetchConfig).to.include({ method: 'get' });
  });

  it('dispatches ENTITY_DATA_DOWNLOAD_SUCCEEDED_TYPE action with proper payload when download succeeded', (done) => {
    const response = { value: 1, another: 2 };
    const fetchClient = httpClientMocker(true, response);
    const dispatch = dispatchMocker();

    const props = {
      ...baseProps,
      fetchClient,
      dispatch,
    };
    props.match.config.url = 'some/url';

    const instance = buildComponentInstance(props);
    instance.fetchEntityData().then(asyncAssert(() => {
      expect(dispatch.callCount).to.equal(1);
      const action = dispatch.getCall(0).args[0];
      expect(action).to.have.property('type', ENTITY_DATA_DOWNLOAD_SUCCEEDED_TYPE);
      expect(action).to.have.deep.property('payload', {
        response,
        namespace: props.match.config.url,
      });
    }, done), done);
  });

  it('dispatches ENTITY_DATA_DOWNLOAD_FAILED_TYPE action with proper payload when download failed', (done) => {
    const response = { value: 1, another: 2 };
    const fetchClient = httpClientMocker(false, response);
    const dispatch = dispatchMocker();

    const props = {
      ...baseProps,
      fetchClient,
      dispatch,
    };
    props.match.config.url = 'some/url';

    const instance = buildComponentInstance(props);
    instance.fetchEntityData().then(asyncAssert(() => {
      expect(dispatch.callCount).to.equal(1);
      const action = dispatch.getCall(0).args[0];
      expect(action).to.have.property('type', ENTITY_DATA_DOWNLOAD_FAILED_TYPE);
      expect(action).to.have.deep.property('payload', {
        response,
        namespace: props.match.config.url,
      });
    }, done), done);
  });
});

describe('page/UpdateForm.buildTargetUrl', () => {
  it('is a function', () => {
    const instance = buildComponentInstance();

    expect(instance.buildTargetUrl).to.be.a('function');
  });

  it('returns a string', () => {
    const instance = buildComponentInstance();

    expect(instance.buildTargetUrl()).to.be.a('string');
  });

  it('returns an url from `match.config.url` property when there are no wildcards in it', () => {
    const props = { ...baseProps };
    props.match.config.url = 'some/config/url';

    const instance = buildComponentInstance(props);

    expect(instance.buildTargetUrl()).to.equal(props.match.config.url);
  });

  it('returns an url from `match.config.url` prop binded with params from `match.params` prop', () => {
    const props = { ...baseProps };
    props.match.config.url = 'some/config/{test}/a/{id}';
    props.match.params = { test: 'value', id: 3 };

    const instance = buildComponentInstance(props);

    expect(instance.buildTargetUrl()).to.equal('some/config/value/a/3');
  });
});
