import React, { Component } from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';

import providerWrapper from '../../providerWrapper.js';

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

export { baseProps };

export default (Form, description, defaultProps = {}) => {
  const props = {
    ...baseProps,
    ...defaultProps,
  };

  describe(description, () => {
    it('is React component', () => {
      expect(Form.prototype).to.be.an.instanceof(Component);
    });

    it('renders as much form fields as given in `config` prop under key `form` when all of them are valid', () => {
      const config = {
        ...props.config,
        form: {
          fieldOne: { type: 'text', label: 'Label' },
          fieldTwo: { type: 'submit', label: 'Label' },
          fieldThree: { type: 'file', label: 'Label' },
        },
      };

      const ProviderComponent = providerWrapper()(Form);
      const wrapper = render((
        <ProviderComponent
          { ...props }
          config={ config }
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
