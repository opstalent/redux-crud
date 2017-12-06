import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-15';

import templated from '../../src/page/templated.js';
import resolverContainer from '../../src/page/resolverContainer.js';

configure({ adapter: new Adapter() });

describe('page/templated', () => {
  it('is a higher order component', () => {
    expect(templated).to.be.a('function');
    expect(templated()).to.be.a('function');

    const wrappedComponentSpy = spy(() => <div />);
    const Component = templated()(wrappedComponentSpy);
    expect(() => mount(<Component />)).to.not.throw();
    expect(wrappedComponentSpy.called).to.equal(true);
  });

  it('passes `resolverContainer` to wrapped component\'s `templateResolver` prop when neither `templateResolver` prop nor `defaultResolver` config passed', () => {
    const wrappedComponentSpy = spy(() => <div />);
    const Component = templated()(wrappedComponentSpy);
    mount(<Component />);

    const wrappedComponentProps = wrappedComponentSpy.getCall(0).args[0];
    expect(wrappedComponentProps).to.have.key('templateResolver');
    expect(wrappedComponentProps.templateResolver).to.deep.equal(resolverContainer);
  });

  it('passes `templateResolver` passed by config to wrapped component\'s `templateResolver` prop when `defaultResolver` config passed and no `templateResolver` prop passed', () => {
    const wrappedComponentSpy = spy(() => <div />);
    const resolver = { someResolver: () => 'div' };
    const Component = templated({
      defaultResolver: resolver,
    })(wrappedComponentSpy);
    mount(<Component />);

    const wrappedComponentProps = wrappedComponentSpy.getCall(0).args[0];
    expect(wrappedComponentProps).to.have.key('templateResolver');
    expect(wrappedComponentProps.templateResolver).to.deep.equal(resolver);
  });

  it('passes `templateResolver` passed by `templateResolver` prop to wrapped component\'s `templateResolver` prop when it is defined', () => {
    const wrappedComponentSpy = spy(() => <div />);
    const defaultResolver = { defaultResolver: () => 'div' };
    const resolver = { someResolver: () => 'div' };
    const Component = templated({
      defaultResolver,
    })(wrappedComponentSpy);
    mount(<Component templateResolver={ resolver } />);

    const wrappedComponentProps = wrappedComponentSpy.getCall(0).args[0];
    expect(wrappedComponentProps).to.have.key('templateResolver');
    expect(wrappedComponentProps.templateResolver).to.deep.equal(resolver);
  });

  it('passes given props to wrapped component', () => {
    const wrappedComponentSpy = spy(() => <div />);
    const props = { someProp: 'someValue', someAnotherProp: 'value' };
    const Component = templated()(wrappedComponentSpy);
    mount(<Component { ...props } />);

    const wrappedComponentProps = wrappedComponentSpy.getCall(0).args[0];
    expect(wrappedComponentProps).to.deep.include(props);
  });
});
