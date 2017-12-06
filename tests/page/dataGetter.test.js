import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';

import { dataGetter } from '../../src/page/dataGetter.js';
import {
  DATA_DOWNLOAD_SUCCEEDED_TYPE,
  DATA_DOWNLOAD_FAILED_TYPE,
} from '../../src/actions.js';

import httpClientMocker from '../httpClientMocker.js';
import dispatchMocker from '../dispatchMocker.js';
import asyncAssert from '../asyncAssert.js';

configure({ adapter: new Adapter() });

const baseProps = {
  fetchClient: () => new Promise(resolve => resolve()),
  dispatch: () => {},
  match: {
    config: {
      url: '/some/url',
    },
  },
  data: {},
};

const buildComponentInstance = (props = {}) => {
  const Component = dataGetter(() => <div />);

  return new Component({ ...baseProps, ...props });
}
const mountComponent = Component => (props = {}) => mount(<Component { ...baseProps } { ...props } />);
const generateSpyComponent = () => spy(() => <div />);

describe('page/dataGetter', () => {
  it('is higher order component', () => {
    expect(dataGetter).to.be.a('function');

    const wrappedComponent = generateSpyComponent();
    expect(mountComponent(dataGetter(wrappedComponent))).to.not.throw();
    expect(wrappedComponent.called).to.equal(true);
  });

  it('is passing all given props into wrapped component', () => {
    const props = { a: 1, b: 2, c: 3 };
    const wrappedComponent = generateSpyComponent();

    mountComponent(dataGetter(wrappedComponent))(props);
    expect(wrappedComponent.getCall(0).args[0]).to.deep.include(props);
  });
});

describe('page/DataGetter', () => {
  it('passes `data` prop to wrapped component from given prop `data`', () => {
    const entity = { someValue: 1, someAnotherValue: 2 }
    const componentSpy = generateSpyComponent();

    const props = {
      ...baseProps,
      data: {
        'some/namespace': entity,
      },
    };
    props.match.config.url = 'some/namespace';
    mountComponent(dataGetter(componentSpy))(props);

    const wrappedComponentProps = componentSpy.getCall(0).args[0];
    expect(wrappedComponentProps).to.have.property('data');
    expect(wrappedComponentProps.data).to.deep.equal(entity);
  });
});

describe('page/DataGetter.componentDidMount', () => {
  it('is a function', () => {
    const instance = buildComponentInstance();

    expect(instance.componentDidMount).to.be.a('function');
  });

  it('calls `fetchData` of component instance', () => {
    const instance = buildComponentInstance();
    instance.fetchData = spy(instance.fetchData);

    instance.componentDidMount();

    expect(instance.fetchData.callCount).to.equal(1);
  });
});


describe('page/DataGetter.fetchData', () => {
  it('is a function', () => {
    const instance = buildComponentInstance();

    expect(instance.fetchData).to.be.a('function');
  });

  it('calls function given by `fetchClient` prop exactly once', () => {
    const fetchClient = httpClientMocker(true);
    const instance = buildComponentInstance({ fetchClient });

    instance.fetchData();
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

    instance.fetchData();
    const fetchConfig = fetchClient.getCall(0).args[0];

    expect(fetchConfig).to.include({ url: 'some/config/value/a/3' });
  });

  it('calls function given by `fetchClient` prop with GET method', () => {
    const fetchClient = httpClientMocker(true);
    const instance = buildComponentInstance({ fetchClient });

    instance.fetchData();
    const fetchConfig = fetchClient.getCall(0).args[0];

    expect(fetchConfig).to.include({ method: 'get' });
  });

  it('dispatches DATA_DOWNLOAD_SUCCEEDED_TYPE action with proper payload when download succeeded', (done) => {
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
    instance.fetchData().then(asyncAssert(() => {
      expect(dispatch.callCount).to.equal(1);
      const action = dispatch.getCall(0).args[0];
      expect(action).to.have.property('type', DATA_DOWNLOAD_SUCCEEDED_TYPE);
      expect(action).to.have.deep.property('payload', {
        response,
        namespace: props.match.config.url,
      });
    }, done), done);
  });

  it('dispatches DATA_DOWNLOAD_FAILED_TYPE action with proper payload when download failed', (done) => {
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
    instance.fetchData().then(asyncAssert(() => {
      expect(dispatch.callCount).to.equal(1);
      const action = dispatch.getCall(0).args[0];
      expect(action).to.have.property('type', DATA_DOWNLOAD_FAILED_TYPE);
      expect(action).to.have.deep.property('payload', {
        response,
        namespace: props.match.config.url,
      });
    }, done), done);
  });
});
