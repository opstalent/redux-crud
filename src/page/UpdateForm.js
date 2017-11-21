import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import { CreateForm } from './CreateForm.js';

const updateFormWrapper = (WrappedComponent) => {
  class UpdateForm extends Component {
    getInitialValues() {
      return Object.entries(this.props.config.form).reduce((acc, [ field, { data } ]) => ({
        ...acc,
        [field]: data,
      }), {});
    }

    render() {
      return (
        <WrappedComponent
          initialValues={ this.getInitialValues() }
          { ...this.props }
        />
      );
    }
  }

  UpdateForm.propTypes = {
    config: PropTypes.shape({
      form: PropTypes.objectOf(PropTypes.shape({
        data: PropTypes.any,
      })).isRequired,
    }).isRequired,
  };

  return UpdateForm;
};

export { updateFormWrapper }

export default compose(
  updateFormWrapper,
  reduxForm(),
)(CreateForm);
