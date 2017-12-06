import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import binder from '../path/wildcardBinder.js';
import {
  DATA_DOWNLOAD_SUCCEEDED,
  DATA_DOWNLOAD_FAILED,
} from '../actions.js';

const dataGetter = (WrappedComponent) => {
  class DataGetter extends Component
  {
    componentDidMount() {
      this.fetchData();
    }

    fetchData() {
      const url = binder(this.props.match.config.url, this.props.match.params);

      return this.props.fetchClient({
        url,
        method: 'get',
      }).then(response => this.props.dispatch(DATA_DOWNLOAD_SUCCEEDED({
        response,
        namespace: url,
      }))).catch(({ response }) => this.props.dispatch(DATA_DOWNLOAD_FAILED({
        response,
        namespace: url,
      })));
    }

    render() {
      const url = binder(this.props.match.config.url, this.props.match.params);
      return (
        <WrappedComponent
          { ...this.props }
          data={ this.props.data[url] }
        />
      );
    }
  }

  DataGetter.propTypes = {
    fetchClient: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.shape({
      config: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
      params: PropTypes.object,
    }).isRequired,
    data: PropTypes.object.isRequired,
  };

  return DataGetter;
};

export { dataGetter };

const mapStateToProps = state => ({
  data: state.crud && state.crud.data || {},
});

export default compose(
  connect(mapStateToProps, dispatch => ({ dispatch })),
  dataGetter
);
