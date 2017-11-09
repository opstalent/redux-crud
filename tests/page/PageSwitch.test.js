import React, { Component } from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import { PageSwitch } from '../../src/page/PageSwitch.js';
import { URL_MATCH_FAILURE_TYPE } from '../../src/actions.js'

configure({ adapter: new Adapter() });

const baseProps = {
  options: {},
  url: '',
  dispatch: () => {},
};

const buildComponentInstance = (props = {}) => shallow(<PageSwitch { ...baseProps } { ...props } />).instance();

describe('page/PageSwitch', () => {
  it('is React component', () => {
    expect(PageSwitch.prototype).to.be.an.instanceof(Component);
  });
});

describe('page/PageSwitch.resolve', () => {
  it('is a function', () => {
    const instance = buildComponentInstance();
    expect(instance.resolve).to.be.an('function');
  });

  it('returns React component', () => {
    const instance = buildComponentInstance();
    expect(React.isValidElement(instance.resolve())).to.equal(true);
  });

  it('passes `handlerBuilder` property into rendered component when match has been found', () => {
    const option = {
      url: '/some/matching/url',
      action: 'add',
    };
    const instance = buildComponentInstance({
      options: {
        'route': option,
      },
      url: '/some/matching/url/add',
    });

    const component = instance.resolve();

    expect(component.props).to.have.property('handlerBuilder');
  });

  it('calls route resolver', () => {
    const resolver = spy(() => {});

    const instance = buildComponentInstance({
      routeResolver: resolver,
    });

    instance.resolve();
    expect(resolver.called).to.equal(true);
  });

  it('calls route resolver with options passed through', () => {
    const resolver = spy(() => {});
    const options = {
      someValue: { url: '', action: '' },
    };

    const instance = buildComponentInstance({
      routeResolver: resolver,
      options,
    });

    instance.resolve();
    expect(resolver.getCall(0).args[0]).to.deep.equal(options);
  });

  it('calls url matcher', () => {
    const matcher = spy(() => {});
    const instance = buildComponentInstance({
      matcher,
    });

    instance.resolve();
    expect(matcher.called).to.equal(true);
  });

  it('calls dispatch with URL_MATCH_FAILURE_TYPE action when option has not been found', () => {
    const dispatch = spy(() => {});
    const instance = buildComponentInstance({
      options: {},
      url: '/some/not/matching/url',
      dispatch,
    });

    instance.resolve();
    expect(dispatch.called).to.equal(true);
    expect(dispatch.getCall(0).args[0]).to.have.property('type', URL_MATCH_FAILURE_TYPE);
  });

  it('does not dispatching URL_MATCH_FAILURE_TYPE action when option has been found', () => {
    const dispatch = spy(() => {});
    const instance = buildComponentInstance({
      options: {
        'route': { url: '/some/matching/url', action: 'list' }
      },
      url: '/some/matching/url/list',
      dispatch,
    });

    instance.resolve();
    dispatch.getCalls().forEach(item => expect(item.args).to.not.have.property('type', URL_MATCH_FAILURE_TYPE));
  });

  it('calls dispatch with url, options and error in payload when option has not been found', () => {
    const dispatch = spy(() => {});
    const instance = buildComponentInstance({
      options: {},
      url: '/some/not/matching/url',
      dispatch,
    });

    instance.resolve();
    expect(dispatch.called).to.equal(true);
    expect(dispatch.getCall(0).args[0]).to.have.property('payload');
    expect(dispatch.getCall(0).args[0].payload).to.have.keys('url', 'options', 'error');
  });
});
