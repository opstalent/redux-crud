import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fetchOptions from './fetchOptions.js';

class Loader extends React.Component
{
  constructor(props) {
    super(props);

    this.namespace = `${props.apiUrl}${props.endpoint}`;

    if (undefined === props.options[this.namespace]) {
      fetchOptions(this.namespace, this.props.dispatch, this.props.fetchClient);
    }
  }

  render() {
    if (undefined !== this.props.customRenderer) {
      const CustomRenderer = this.props.customRenderer;
      return (
        <CustomRenderer
          match={ this.props.match }
        />
      );
    }

    return <div>Loading...</div>;
  }
}

Loader.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetchClient: PropTypes.func,
  customRenderer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  match: PropTypes.any,
  options: PropTypes.object,
  apiUrl: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

Loader.defaultProps = {
  options: {},
};

const mapStateToProps = state => ({
  options: state.crud,
});

export default connect(mapStateToProps, dispatch => ({ dispatch }))(Loader);

export {
  Loader,
};
