import React from 'react';
import PropTypes from 'prop-types';
import { Route as BaseRoute } from 'react-router-dom';
import { connect } from 'react-redux';

import PageSwitch from './page/PageSwitch.js';
import Loader from './Loader.js';

class Route extends React.Component
{
  getNamespace() {
    const { apiUrl, path } = this.props;

    return `${apiUrl}${path}`;
  }

  getOptions() {
    return this.props.options[this.getNamespace()];
  }

  isLoaded() {
    return undefined !== this.getOptions();
  }

  onMatch = ({ match, location: { pathname } }) => {
    if (this.isLoaded()) {
      return <PageSwitch
        options={ this.getOptions() }
        url={ pathname }
        templateResolver={ this.props.templateResolver }
        apiUrl={ this.props.apiUrl }
        fetchClient={ this.props.fetchClient }
      />;
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
  options: PropTypes.objectOf(PropTypes.objectOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
  }))),
  dispatch: PropTypes.func.isRequired,
  templateResolver: PropTypes.any,
};

Route.defaultProps = {
  options: {},
};

const mapStateToProps = state => ({
  options: state.crud.options,
});

export default connect(mapStateToProps, dispatch => ({ dispatch }))(Route);

export {
  Route,
};
