import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import resolverContainer from './resolverContainer.js';
import FieldComponent from './form/FieldComponent.js';

class CreateForm extends React.Component
{
  constructor(props) {
    super(props);

    this.pageWrapper = this.getPageResolver().pageWrapper('add');
    this.fieldWrapper = this.getPageResolver().fieldWrapper('add');
  }

  componentWillReceiveProps(props) {
    if (
      props.config.url !== this.props.config.url
      || props.config.method !== this.props.config.method
    ) {
      this.buildHandler();
    }
  }

  getPageResolver() {
    return this.props.templateResolver || resolverContainer;
  }

  getHandler() {
    if (undefined === this.handler) {
      this.buildHandler();
    }

    return this.handler;
  }

  buildHandler() {
    this.props.handlerBuilder.setUrl(this.props.config.url);
    this.props.handlerBuilder.setMethod(this.props.config.method);

    this.handler = this.props.handlerBuilder.build();

    return this.handler;
  }

  resolveField = ([ key, config = {} ]) => (
    <Field
      name={ key }
      key={ key }
      config={ { wrapperType: 'add', ...config } }
      templateResolver={ this.props.templateResolver }
      component={ FieldComponent }
    />
  );

  prepareFields(list = {}) {
    return Object.entries(list).map(this.resolveField);
  }

  render() {
    const Wrapper = this.pageWrapper;
    return (
      <Wrapper onSubmit={ this.props.handleSubmit(this.getHandler()) }>
        { this.prepareFields(this.props.config.form) }
      </Wrapper>
    );
  }
}

CreateForm.propTypes = {
  config: PropTypes.shape({
    form: PropTypes.objectOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
    })),
    url: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handlerBuilder: PropTypes.shape({
    build: PropTypes.func.isRequired,
    setUrl: PropTypes.func.isRequired,
    setMethod: PropTypes.func.isRequired,
  }).isRequired,
  templateResolver: PropTypes.shape({
    pageWrapper: PropTypes.func.isRequired,
  }),
};

export {
  CreateForm,
};

export default reduxForm()(CreateForm);
