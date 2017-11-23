import { combineReducers } from 'redux';

import optionsReducer from './reducer/optionsReducer.js';
import entityDataReducer from './reducer/entityDataReducer.js';

export default combineReducers({
  options: optionsReducer,
  entityData: entityDataReducer,
});
