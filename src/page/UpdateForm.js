import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { CreateForm } from './CreateForm.js';
import formNamer from './form/formNamer.js';
import binder from '../path/wildcardBinder.js';
import entityGetter from './entityGetter.js';

const updateFormWrapper = (WrappedComponent) => {
  class UpdateForm extends Component {
    render() {
      const props = { ...this.props };
      props.match.config.url = binder(this.props.match.config.url, this.props.match.params);

      return (
        <WrappedComponent
          { ...props }
          initialValues={ this.props.entity }
        />
      );
    }
  }

  UpdateForm.propTypes = {
    match: PropTypes.shape({
      config: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
      params: PropTypes.object,
    }).isRequired,
  };

  return UpdateForm;
};

export { updateFormWrapper }

export default compose(
  connect(null, dispatch => ({ dispatch })),
  entityGetter,
  updateFormWrapper,
  formNamer,
  reduxForm(),
)(CreateForm);
