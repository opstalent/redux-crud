import React from 'react';
import PropTypes from 'prop-types';
import { Route as BaseRoute } from 'react-router-dom';

import Loader from './Loader.js';

const Route = ({ path, apiUrl, loaderComponent }) =>
  <BaseRoute path={ path }
    render={ match => <Loader
      match={ match }
      apiUrl={ apiUrl }
      endpoint={ path }
      customRenderer={ loaderComponent }
    /> }
  />;


Route.propTypes = {
  path: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
  loaderComponent: PropTypes.node,
};

export default Route;
