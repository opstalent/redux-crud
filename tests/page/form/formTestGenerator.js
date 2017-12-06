import React, { Component } from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import providerWrapper from '../../providerWrapper.js';

const baseProps = {
  match: {
    config: {
      url: '/some/url',
      method: 'PUT',
    },
    key: 'some_key',
  },
  apiUrl: 'someUrl',
  templateResolver: {
    pageWrapper: () => ({ children }) => <div>{ children }</div>,
    fieldWrapper: () => ({ children }) => <div>{ children }</div>,
    field: () => () => <input />
  },
  handleSubmit: () => () => {},
  handlerBuilder: {
    build: () => () => {},
    setUrl: () => {},
    setMethod: () => {},
  },
};

export { baseProps };

export default (Form, description, defaultProps = {}) => {
  const props = {
    ...baseProps,
    ...defaultProps,
  };
  describe(description, () => {
    it('is renderable', () => {
      const ProviderComponent = providerWrapper()(Form);
      expect(() => shallow(<ProviderComponent { ...props } />)).to.not.throw();
    });

    it('renders as much form fields as given in `config` prop under key `form` when all of them are valid', () => {
      const config = {
        ...props.match.config,
        form: {
          fieldOne: { type: 'text', label: 'Label' },
          fieldTwo: { type: 'submit', label: 'Label' },
          fieldThree: { type: 'file', label: 'Label' },
        },
      };

      const ProviderComponent = providerWrapper()(Form);
      const wrapper = mount((
        <ProviderComponent
          { ...props }
          match={ {
            ...props.match,
            config,
          } }
          form="test_form"
        />
      ));

      expect([
        ...wrapper.find('input'),
        ...wrapper.find('button'),
        ...wrapper.find('textarea'),
      ]).to.have.length(3);
    });
  });
};
