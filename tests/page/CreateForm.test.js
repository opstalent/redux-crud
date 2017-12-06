import React, { Component } from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { configure, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Field } from 'redux-form';
import configureStore from 'redux-mock-store';

import Form, { CreateForm } from '../../src/page/CreateForm.js'
import testGenerator, { baseProps } from './form/formTestGenerator.js';

configure({ adapter: new Adapter() });
testGenerator(Form, 'page/CreateForm');

const buildComponent = (props = {}) =>
  shallow(<CreateForm { ...baseProps } { ...props } />);

const buildComponentInstance = (props = {}) =>
  new CreateForm({ ...baseProps, ...props });

describe('page/CreateForm.componentWillReceiveProps', () => {
  it('is a function', () => {
    const instance = buildComponentInstance(baseProps);

    expect(instance.componentWillReceiveProps).to.be.a('function');
  });

  it('does not update `handler` when neither method nor url in `config` prop has been changed', () => {
    const instance = buildComponentInstance(baseProps);
    const handler = instance.handler;

    instance.componentWillReceiveProps({
      ...baseProps,
      someProp: 'value',
    });
    expect(instance.handler).to.equal(handler);
  });

  it('updates `handler` property when new url in `config` prop is given', () => {
    const instance = buildComponentInstance({
      ...baseProps,
      match: {
        ...baseProps.match,
        config: {
          ...baseProps.match.config,
          url: '/some/url',
        },
      },
    });
    const handler = instance.handler;

    instance.componentWillReceiveProps({
      ...baseProps,
      match: {
        ...baseProps.match,
        config: {
          ...baseProps.match.config,
          url: '/some/another/url',
        },
      },
    });
    expect(instance.handler).to.not.equal(handler);
  });

  it('updates `handler` property when new method in `config` prop is given', () => {
    const instance = buildComponentInstance({
      ...baseProps,
      match: {
        ...baseProps.match,
        config: {
          ...baseProps.match.config,
          method: 'POST',
        },
      },
    });
    const handler = instance.handler;

    instance.componentWillReceiveProps({
      ...baseProps,
      config: {
        ...baseProps.config,
        method: 'PUT',
      },
    });
    expect(instance.handler).to.not.equal(handler);
  });
});

describe('page/CreateForm.buildHandler', () => {
  it('is a function', () => {
    expect(buildComponentInstance().buildHandler).to.be.a('function');
  });

  it('returns a function', () => {
    expect(buildComponentInstance().buildHandler()).to.be.a('function');
  });

  it('updates `handler` property', () => {
    const instance = buildComponentInstance(baseProps);
    const handler = instance.handler;

    instance.buildHandler();
    expect(instance.handler).to.not.equal(handler);
  });
});

describe('page/CreateForm.getHandler', () => {
  it('is a function', () => {
    expect(buildComponentInstance().getHandler).to.be.a('function');
  });

  it('returns a function', () => {
    expect(buildComponentInstance().getHandler()).to.be.a('function');
  });

  it('calls `buildHandler` at first call', () => {
    const instance = buildComponentInstance(baseProps);
    instance.buildHandler = spy(instance.buildHandler);

    instance.getHandler();
    expect(instance.buildHandler.called).to.equal(true);
  });

  it('does not call `buildHandler` at second call', () => {
    const instance = buildComponentInstance(baseProps);
    instance.buildHandler = spy(instance.buildHandler);


    instance.getHandler();
    const callCount = instance.buildHandler.callCount;

    instance.getHandler();
    expect(instance.buildHandler.callCount).to.equal(callCount);
  });
});

describe('page/CreateForm.resolveField', () => {
  it('is a function', () => {
    expect(buildComponentInstance().resolveField).to.be.a('function');
  });

  it('returns React element', () => {
    const config = {
      type: 'text',
      label: 'Label',
    };
    expect(React.isValidElement(buildComponentInstance().resolveField(['some_name', config]))).to.equal(true);
  });

  it('returns React element with name prop same as first item of an entry argument', () => {
    const config = {
      type: 'text',
      label: 'Label',
    };
    const field = buildComponentInstance().resolveField(['some_name', config]);

    expect(field.props).to.have.property('name');
    expect(field.props.name).to.equal('some_name');
  });

  it('passes given config\'s to returned component', () => {
    const config = {
      type: 'choice',
      choices: {
        'someLabel': 'someValue',
      },
      label: 'Label',
    }
    const instance = buildComponentInstance();
    const field = instance.resolveField(['some_name', config]);

    expect(field.props).to.have.property('config');
    expect(field.props.config).to.deep.include(config);
  });

  it('returns redux-form Field component', () => {
    const field = buildComponentInstance().resolveField(['some_name', { type: 'text', label: 'Label' }]);
    expect(field.type).to.equal(Field);
  });
});

describe('page/CreateForm.prepareFields', () => {
  it('is a function', () => {
    expect(buildComponentInstance().prepareFields).to.be.a('function');
  });

  it('returns empty array when no argument passed', () => {
    expect(buildComponentInstance().prepareFields()).to.have.length(0);
  });

  it('returns array with length same as number of variables in object passed as argument', () => {
    const arg = {
      someValue: { type: 'text', label: 'Label' },
      anotherValue: { type: 'file', label: 'Label' },
    };

    expect(buildComponentInstance().prepareFields(arg)).to.have.length(2);
  });
});
