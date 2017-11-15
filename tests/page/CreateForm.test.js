import React, { Component } from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { configure, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Field } from 'redux-form';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Form, { CreateForm } from '../../src/page/CreateForm.js'

configure({ adapter: new Adapter() });

const baseProps = {
  config: {
    url: '/some/url',
    method: 'PUT',
  },
  handleSubmit: () => () => {},
  handlerBuilder: {
    build: () => () => {},
    setUrl: () => {},
    setMethod: () => {},
  },
};

const buildComponent = (props = {}) =>
  shallow(<CreateForm { ...baseProps } { ...props } />);

const buildComponentInstance = (props = {}) =>
  buildComponent(props).instance();

describe('page/CreateForm', () => {
  it('is React component', () => {
    expect(Form.prototype).to.be.an.instanceof(Component);
  });

  it('renders as much form fields as given in `config` prop under key `form` when all of them are valid', () => {
    const config = {
      ...baseProps.config,
      form: {
        fieldOne: { type: 'text', label: 'Label' },
        fieldTwo: { type: 'submit', label: 'Label' },
        fieldThree: { type: 'file', label: 'Label' },
      },
    };

    const wrapper = render((
      <Provider store={ configureStore()() }>
        <Form
          { ...baseProps }
          config={ config }
          form="test_form"
        />
      </Provider>
    ));

    expect([
      ...wrapper.find('input'),
      ...wrapper.find('button'),
      ...wrapper.find('textarea'),
    ]).to.have.length(3);
  });

  it('passes `onSubmit` prop to top level wrapper', () => {
    const wrapper = buildComponent();

    expect(wrapper.props()).to.have.property('onSubmit');
    expect(wrapper.prop('onSubmit')).to.be.a('function');
  });
});

describe('page/CreateForm.componentWillReceiveProps', () => {
  it('is a function', () => {
    const instance = new CreateForm(baseProps);

    expect(instance.componentWillReceiveProps).to.be.a('function');
  });

  it('does not update `handler` when neither method nor url in `config` prop has been changed', () => {
    const instance = new CreateForm(baseProps);
    const handler = instance.handler;

    instance.componentWillReceiveProps({
      ...baseProps,
      someProp: 'value',
    });
    expect(instance.handler).to.equal(handler);
  });

  it('updates `handler` property when new url in `config` prop is given', () => {
    const instance = new CreateForm({
      ...baseProps,
      config: {
        ...baseProps.config,
        url: '/some/url',
      },
    });
    const handler = instance.handler;

    instance.componentWillReceiveProps({
      ...baseProps,
      config: {
        ...baseProps.config,
        url: '/some/another/url',
      },
    });
    expect(instance.handler).to.not.equal(handler);
  });

  it('updates `handler` property when new method in `config` prop is given', () => {
    const instance = new CreateForm({
      ...baseProps,
      config: {
        ...baseProps.config,
        method: 'POST',
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

  it('calls method `buildHandler` of object passed by `handlerBuilder` prop', () => {
    const buildHandler = spy(() => () => {});
    const instance = buildComponentInstance({
      handlerBuilder: {
        ...baseProps.handlerBuilder,
        build: buildHandler,
      },
    });
    instance.buildHandler();

    expect(buildHandler.called).to.equal(true);
  });

  it('calls method `setUrl` of object passed by `handlerBuilder` prop with url given in `config` prop', () => {
    const setUrl = spy(() => {});
    const instance = buildComponentInstance({
      handlerBuilder: {
        ...baseProps.handlerBuilder,
        setUrl,
      },
      config: {
        ...baseProps.config,
        url: '/some/url',
      },
    });
    instance.buildHandler();

    expect(setUrl.called).to.equal(true);
    expect(setUrl.getCall(0).args[0]).to.equal('/some/url');
  });

  it('calls method `setMethod` of object passed by `handlerBuilder` prop with method given in `config` prop', () => {
    const setMethod = spy(() => {});
    const instance = buildComponentInstance({
      handlerBuilder: {
        ...baseProps.handlerBuilder,
        setMethod,
      },
      config: {
        ...baseProps.config,
        method: 'POST',
      },
    });
    instance.buildHandler();

    expect(setMethod.called).to.equal(true);
    expect(setMethod.getCall(0).args[0]).to.equal('POST');
  });

  it('updates `handler` property', () => {
    const instance = new CreateForm(baseProps);
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
    const instance = new CreateForm(baseProps);
    instance.buildHandler = spy(instance.buildHandler);

    instance.getHandler();
    expect(instance.buildHandler.called).to.equal(true);
  });

  it('does not call `buildHandler` at second call', () => {
    const instance = new CreateForm(baseProps);
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

describe('page/CreateForm.getPageResolver', () => {
  it('is a function', () => {
    expect(buildComponentInstance().getPageResolver).to.be.a('function');
  });

  it('returns an object', () => {
    expect(buildComponentInstance().getPageResolver()).to.be.an('object');
  });

  it('returns an object with property `pageWrapper` which value is a function', () => {
    const resolver = buildComponentInstance().getPageResolver();
    expect(resolver).to.have.property('pageWrapper');
    expect(resolver.pageWrapper).to.be.a('function');
  });

  it('returns an object with property `fieldWrapper` which value is a function', () => {
    const resolver = buildComponentInstance().getPageResolver();
    expect(resolver).to.have.property('fieldWrapper');
    expect(resolver.fieldWrapper).to.be.a('function');
  });

  it('returns an object with property `field` which value is a function', () => {
    const resolver = buildComponentInstance().getPageResolver();
    expect(resolver).to.have.property('field');
    expect(resolver.field).to.be.a('function');
  });
});
