import React from 'react';
import { expect } from 'chai';
import Enzyme, { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Route as DomRoute } from 'react-router-dom';

import { Route } from '../src/Route.js';
import Loader from '../src/Loader.js';

configure({ adapter: new Adapter() });

const baseProps = {
  fetchClient: () => new Promise(resolve => resolve()),
  path: 'somePath',
  apiUrl: 'someApi',
};

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
          justNamespace: {},
          justANamespace: {},
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
          [`${baseProps.apiUrl}${baseProps.path}`]: {},
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
          [`${baseProps.apiUrl}${baseProps.path}`]: {},
        } }
      />
    ));
    const component = shallow(wrapper.instance().onMatch());
    expect(component.containsMatchingElement((
      <Loader
        apiUrl={ baseProps.apiUrl }
        endpoint={ baseProps.path }
      />
    )));
  });

  // @TODO: verify if proper page is defined
});

describe('Route', () => {
  it('contains Route from `react-router-dom`', () => {
    const wrapper = shallow(<Route { ...baseProps } />);
    expect(wrapper.containsMatchingElement(<DomRoute />)).to.equal(true);
  });
});
