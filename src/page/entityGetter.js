import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import binder from '../path/wildcardBinder.js';
import {
  ENTITY_DATA_DOWNLOAD_SUCCEEDED,
  ENTITY_DATA_DOWNLOAD_FAILED,
} from '../actions.js';

const entityGetter = (WrappedComponent) => {
  class EntityGetter extends Component
  {
    componentDidMount() {
      this.fetchData();
    }

    fetchData() {
      const url = binder(this.props.match.config.url, this.props.match.params);

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
      const url = binder(this.props.match.config.url, this.props.match.params);
      return (
        <WrappedComponent
          { ...this.props }
          entity={ this.props.entityData[url] }
        />
      );
    }
  }

  EntityGetter.propTypes = {
    fetchClient: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.shape({
      config: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
      params: PropTypes.object,
    }).isRequired,
    entityData: PropTypes.object.isRequired,
  };

  return EntityGetter;
};

export { entityGetter };

const mapStateToProps = state => ({
  entityData: state.crud && state.crud.entityData || {},
});

export default WrappedComponent =>
  compose(
    connect(mapStateToProps, dispatch => ({ dispatch })),
    entityGetter
  )(WrappedComponent);
