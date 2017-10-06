import axios from 'axios';

import {
  OPTIONS_LOADED,
  OPTIONS_LOAD_FAILED,
} from './actions.js';

export default (url, dispatch, customClient) => {
  const client = customClient || axios;

  return client({
    url,
    method: 'options',
  }).then(response => dispatch(OPTIONS_LOADED({
    response,
    namespace: url,
  }))).catch(error => dispatch(OPTIONS_LOAD_FAILED({
    response: error.response,
    namespace: url,
  })));
};
