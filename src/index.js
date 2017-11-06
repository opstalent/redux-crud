import Route from './Route.js';
import reducer from './reducer.js';
import * as actionDefs from './actions.js';
import resolver from './page/resolverContainer.js';

const actions = {
  OPTIONS_LOADED: actionDefs.OPTIONS_LOADED_TYPE,
  OPTIONS_LOAD_FAILED: actionDefs.OPTIONS_LOAD_FAILED_TYPE,
  URL_MATCH_FAILURE: actionDefs.URL_MATCH_FAILURE_TYPE,
};

export {
  Route,
  reducer,
  actions,
  resolver,
};
