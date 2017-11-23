import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import resolverContainer from './resolverContainer.js';
import FieldComponent from './form/FieldComponent.js';
import formNamer from './form/formNamer.js';
import formHandler from './form/formHandler.js';

class CreateForm extends React.Component
{
  constructor(props) {
    super(props);

    this.pageWrapper = this.getPageResolver().pageWrapper('add');
    this.fieldWrapper = this.getPageResolver().fieldWrapper('add');
  }

  componentWillReceiveProps(props) {
    if (
      props.match.config.url !== this.props.match.config.url
      || props.match.config.method !== this.props.match.config.method
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
    this.handler = new formHandler({
      baseUrl: this.props.apiUrl,
      method: this.props.match.config.method,
      url: this.props.match.config.url,
    }, this.props.dispatch);

    if (this.props.fetchClient) {
      this.handler.httpClient = this.props.fetchClient;
    }

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
      <Wrapper onSubmit={ this.props.handleSubmit(this.getHandler()) } config={ this.props.match.config }>
        { this.prepareFields(this.props.match.config.form) }
      </Wrapper>
    );
  }
}

CreateForm.propTypes = {
  match: PropTypes.shape({
    config: PropTypes.shape({
      form: PropTypes.objectOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
      })),
      url: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  templateResolver: PropTypes.shape({
    pageWrapper: PropTypes.func.isRequired,
  }),
  apiUrl: PropTypes.string.isRequired,
  fetchClient: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
};

export {
  CreateForm,
};

export default compose(
  connect(null, dispatch => ({ dispatch })),
  formNamer,
  reduxForm()
)(CreateForm);
