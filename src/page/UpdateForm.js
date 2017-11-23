import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import pathToRegexp from 'path-to-regexp';

import { CreateForm } from './CreateForm.js';
import formNamer from './form/formNamer.js';
import pathTransformer from '../path/transformer.js';
import {
  ENTITY_DATA_DOWNLOAD_SUCCEEDED,
  ENTITY_DATA_DOWNLOAD_FAILED,
} from '../actions.js';

const updateFormWrapper = (WrappedComponent) => {
  class UpdateForm extends Component {
    buildTargetUrl() {
      const url = pathTransformer(this.props.match.config.url);

      return pathToRegexp.compile(url)(this.props.match.params);
    }

    componentDidMount() {
      this.fetchEntityData();
    }

    fetchEntityData() {
      const url = this.buildTargetUrl();

      return this.props.fetchClient({
        url,
        method: 'get',
      }).then(response => this.props.dispatch(ENTITY_DATA_DOWNLOAD_SUCCEEDED({
        response,
        namespace: url,
      }))).catch(({ response }) => this.props.dispatch(ENTITY_DATA_DOWNLOAD_FAILED({
        response,
        namespace: url,
      })));
    }

    render() {
      const url = this.buildTargetUrl();
      const props = { ...this.props };
      props.match.config.url = url;

      return (
        <WrappedComponent
          { ...props }
          initialValues={ this.props.entityData[url] }
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
    fetchClient: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    entityData: PropTypes.object.isRequired,
  };

  return UpdateForm;
};

const mapStateToProps = state => ({
  entityData: state.crud && state.crud.entityData || {},
});

export { updateFormWrapper }


export default compose(
  connect(mapStateToProps, dispatch => ({ dispatch })),
  updateFormWrapper,
  formNamer,
  reduxForm(),
)(CreateForm);
