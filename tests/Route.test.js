import React from 'react';
import { expect } from 'chai';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Route as DomRoute } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { spy } from 'sinon';

import { Route } from '../src/Route.js';
import { Loader } from '../src/Loader.js';
import { PageSwitch } from '../src/page/PageSwitch.js';

configure({ adapter: new Adapter() });

const builderMocker = properties => function() {
  this.setBaseUrl = () => {};
  this.setDispatcher = () => {};

  for (const key in properties) {
    this[key] = properties[key];
  }
};

const baseProps = {
  fetchClient: () => new Promise(resolve => resolve()),
  path: 'somePath',
  apiUrl: 'someApi',
  formHandlerBuilderClass: builderMocker(),
  dispatch: () => {},
};

const loaderProps = {
  dispatch: () => {},
};

describe('Route.createFormHandlerBuilder', () => {
  it('is a function', () => {
    const instance = new Route(baseProps);

    expect(instance.createFormHandlerBuilder).to.be.a('function');
  });

  it('returns an object', () => {
    const instance = new Route(baseProps);

    expect(instance.createFormHandlerBuilder()).to.be.an('object');
  });

  it('returns an object which is instance of class given by property `formHandlerBuilderClass`', () => {
    const instance = new Route(baseProps);

    expect(instance.createFormHandlerBuilder()).to.be.an.instanceof(baseProps.formHandlerBuilderClass);
  });

  it('calls method `setBaseUrl` of object created from `formHandlerBuilderClass` prop with param passed from `apiUrl` prop', () => {
    const setBaseUrlSpy = spy(() => {});
    const classMock = builderMocker({
      setBaseUrl: setBaseUrlSpy,
    });
    const instance = new Route({
      ...baseProps,
      apiUrl: 'someUrl',
      formHandlerBuilderClass: classMock,
    });

    instance.createFormHandlerBuilder();

    expect(setBaseUrlSpy.called).to.equal(true);
    expect(setBaseUrlSpy.getCall(0).args[0]).to.equal('someUrl');
  });

  it('calls method `setDispatcher` of object created from `formHandlerBuilderClass` prop with param passed from `dispatch` prop', () => {
    const setDispatcherSpy = spy(() => {});
    const classMock = builderMocker({
      setDispatcher: setDispatcherSpy,
    });
    const dispatch = () => {};
    const instance = new Route({
      ...baseProps,
      formHandlerBuilderClass: classMock,
      dispatch,
    });

    instance.createFormHandlerBuilder();

    expect(setDispatcherSpy.called).to.equal(true);
    expect(setDispatcherSpy.getCall(0).args[0]).to.equal(dispatch);
  });
});

describe('Route.getNamespace', () => {
  it('returns a string', () => {
    const wrapper = shallow(<Route { ...baseProps } />);

    expect(wrapper.instance().getNamespace()).to.be.a('string');
  });

  it('returns concatenated `apiUrl` and `path` props', () => {
    const wrapper = shallow(<Route { ...baseProps }
      path="path"
      apiUrl="apiUrl"
      />);

    expect(wrapper.instance().getNamespace()).to.equal('apiUrlpath');
  });
});

describe('Route.getOptions', () => {
  it('returns an `undefined` where no options matching namespace passed', () => {
    const wrapper = shallow((
      <Route
        { ...baseProps }
        options={ {
          justNamespace: {
            someAction: {url: '', action: '' },
          },
          justANamespace: {
            someAnotherAction: { url: '', action: '' },
          },
        } }
      />
    ));
    expect(wrapper.instance().getOptions()).to.equal(undefined);
  });

  it('returns an option item matching to namespace if there is one', () => {
    const wrapper = shallow((
      <Route
        { ...baseProps }
        options={ {
          [`${baseProps.apiUrl}${baseProps.path}`]: {
            some_action: { url: '', action: '' },
          },
        } }
      />
    ));
    expect(wrapper.instance().getOptions()).to.deep.equal({ some_action: { url: '', action: '' } });
  });
});

describe('Route.isLoaded', () => {
  it('returns false if options property is not defined', () => {
    const wrapper = shallow(<Route { ...baseProps } />);
    expect(wrapper.instance().isLoaded()).to.equal(false);
  });

  it('returns false if options property is defined but given namespace are not defined', () => {
    const wrapper = shallow((
      <Route
        { ...baseProps }
        options={ {
          justNamespace: {
            someAction: {url: '', action: '' },
          },
          justANamespace: {
            someAnotherAction: { url: '', action: '' },
          },
        } }
      />
    ));
    expect(wrapper.instance().isLoaded()).to.equal(false);
  });

  it('returns true if options for given namespace are defined', () => {
    const wrapper = shallow((
      <Route
        { ...baseProps }
        options={ {
          [`${baseProps.apiUrl}${baseProps.path}`]: {
            some_action: { url: '', action: '' },
          },
        } }
      />
    ));
    expect(wrapper.instance().isLoaded()).to.equal(true);
  });
});

describe('Route.onMatch', () => {
  it('returns Loader component when OPTIONS are not loaded', () => {
    const wrapper = shallow((
      <Route
        { ...baseProps }
        options={ {
          [`${baseProps.apiUrl}${baseProps.path}`]: undefined,
        } }
      />
    ));

    const component = shallow(React.cloneElement(
      wrapper.instance().onMatch({
        location: { pathname: 'some/path' },
      }),
      { store: configureStore()() }
    ));

    expect(component.find(Loader)).to.have.length(1);
  });

  it('returns PageSwitch component when OPTIONS are loaded', () => {
    const wrapper = shallow((
      <Route
        { ...baseProps }
        options={ {
          [`${baseProps.apiUrl}${baseProps.path}`]: {
            some_action: { url: '', action: '' },
          },
        } }
      />
    ));

    const component = shallow(React.cloneElement(
      wrapper.instance().onMatch({
        location: { pathname: 'some/path' },
      }),
      { store: configureStore()() }
    ));

    expect(component.find(PageSwitch)).to.have.length(1);
  });
});

describe('Route', () => {
  it('contains Route from `react-router-dom`', () => {
    const wrapper = shallow(<Route { ...baseProps } />);
    expect(wrapper.containsMatchingElement(<DomRoute />)).to.equal(true);
  });
});
