import React from 'react';
import PropTypes from 'prop-types';
import { Route as BaseRoute } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from './Loader.js';

class Route extends React.Component
{
  isLoaded() {
    const { apiUrl, path } = this.props;

    return undefined !== this.props.options[`${apiUrl}${path}`];
  }

  onMatch = (match) => {
    if (this.isLoaded()) {
      // @TODO: Render proper page based on OPTIONS
      return <div>Rendering...</div>;
    } else {
      return <Loader
        match={ match }
        apiUrl={ this.props.apiUrl }
        endpoint={ this.props.path }
        customRenderer={ this.props.loaderComponent }
        fetchClient={ this.props.fetchClient }
      />;
    }
  }

  render = () => (
    <BaseRoute
      path={ this.props.path }
      render={ this.onMatch }
    />
  );
}

Route.propTypes = {
  path: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
  loaderComponent: PropTypes.node,
  fetchClient: PropTypes.any,
};

Route.defaultProps = {
  options: {},
};

const mapStateToProps = state => ({
  options: state.crud,
});

export default connect(mapStateToProps)(Route);

export {
  Route,
};
