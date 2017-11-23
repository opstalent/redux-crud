import React from 'react';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-15';

import formNamer from '../../../src/page/form/formNamer.js';

configure({ adapter: new Adapter() });

const baseProps = {
  match: { key: 'some_value' },
};
const mountComponent = Component => props => mount(<Component { ...baseProps } { ...props } />);

describe('page/form/formNamer', () => {
  it('is higher order component', () => {
    expect(formNamer).to.be.a('function');

    const wrappedComponentSpy = spy(() => <div />);
    expect(mountComponent(formNamer(wrappedComponentSpy))).to.not.throw(); 
    expect(wrappedComponentSpy.called).to.equal(true);
  });

  it('passes down given props to wrapped component', () => {
    const props = { a: 1, b: 2 };

    const wrappedComponentSpy = spy(() => <div />);
    const Component = formNamer(wrappedComponentSpy);
    mountComponent(Component)(props);

    const wrappedComponentProps = wrappedComponentSpy.getCall(0).args[0];
    expect(wrappedComponentProps).to.deep.include(props);
  });

  it('passes value given in prop `match.key` to wrapped component in prop `form`', () => {
    const props = {
      a: 1,
      b: 2,
      match: { key: 'some_form' },
      form: 'some_another_form',
    };

    const wrappedComponentSpy = spy(() => <div />);
    const Component = formNamer(wrappedComponentSpy);
    mountComponent(Component)(props);

    const wrappedComponentProps = wrappedComponentSpy.getCall(0).args[0];
    expect(wrappedComponentProps).to.have.property('form');
    expect(wrappedComponentProps.form).to.equal('some_form');
  });
});
