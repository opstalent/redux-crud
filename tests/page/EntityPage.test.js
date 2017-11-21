import React from 'react';
import { expect } from 'chai';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import { EntityPage } from '../../src/page/EntityPage.js';

configure({ adapter: new Adapter() });

const baseProps = {
  templateResolver: {
    pageWrapper: () => ({ children }) => <div>{ children }</div>,
    entityAttribute: () => () => <div />,
  },
  match: {
    config: {
      form: {},
    },
  },
  entity: {},
};

const renderEntityPage = (props = {}, renderer = mount) =>
  renderer(<EntityPage { ...baseProps } { ...props } />);
const createEntityPageInstance = (props = {}) =>
  new EntityPage({ ...baseProps, ...props});

describe('page/EntityPage', () => {
  it('is renderable', () => {
    expect(() => renderEntityPage({}, shallow)).to.not.throw();
  });

  it('renders result of `templateResolver.pageWrapper(\'show\')` as top level wrapper', () => {
    const Wrapper = () => <span />;
    const rendered = renderEntityPage({
      templateResolver: {
        ...baseProps.templateResolver,
        pageWrapper: () => Wrapper,
      },
    });

    expect(rendered.childAt(0).type()).to.equal(Wrapper);
  });

  it('renders as many children as number of fields given in `match.config.form` prop', () => {
    const config = {
      form: {
        fieldOne: { type: 'text' },
        fieldTwo: { type: 'justType' },
      },
    };
    const AttributeComponent = () => <b />;
    const templateResolver = {
      ...baseProps.templateResolver,
      entityAttribute: () => AttributeComponent,
    };

    const wrapper = renderEntityPage({ match: { config }, templateResolver });
    expect(wrapper.find(AttributeComponent)).to.be.lengthOf(2);
  });
});

describe('page/EntityPage.prepareFields', () => {
  it('is a function', () => {
    const instance = createEntityPageInstance();

    expect(instance.prepareFields).to.be.a('function');
  });

  it('returns an empty array when no argument passed', () => {
    const instance = createEntityPageInstance();

    expect(instance.prepareFields()).to.deep.equal([]);
  });

  it('returns an array with length same as number of variables in passed object', () => {
    const instance = createEntityPageInstance();
    const config = {
      someValue: { type: 'text' },
      anotherValue: { type: 'file' },
    };

    expect(instance.prepareFields(config)).to.have.lengthOf(2);
  });

  it('returns an array of React elements items', () => {
    const instance = createEntityPageInstance();
    const config = {
      someValue: { type: 'text' },
      justValue: { type: 'file' },
    };

    const fields = instance.prepareFields(config);
    fields.map(Component => expect(React.isValidElement(Component)).to.equal(true));
  });
});

describe('page/EntityPage.resolveField', () => {
  it('is a function', () => {
    const instance = createEntityPageInstance();

    expect(instance.resolveField).to.be.a('function');
  });

  it('returns a React element', () => {
    const instance = createEntityPageInstance();

    const Component = instance.resolveField(['someKey', { type: 'text' }]);
    expect(React.isValidElement(Component)).to.equal(true);
  });

  it('passes given config to returned element', () => {
    const instance = createEntityPageInstance();
    const config = { type: 'text' };

    const Component = instance.resolveField(['someKey', config]);

    expect(Component.props).to.have.property('config');
    expect(Component.props.config).to.deep.include(config);
  });

  it('passes `value` prop with value passed with `entity` prop which key is matching given `key`', () => {
    const props = {
      ...baseProps,
      entity: {
        someKey: 'someValue',
      },
    };
    const instance = createEntityPageInstance(props);
    const config = { type: 'text' };

    const Component = instance.resolveField(['someKey', config]);

    expect(Component.props).to.have.property('value');
    expect(Component.props.value).to.deep.equal(props.entity.someKey);
  });
});
