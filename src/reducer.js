import { combineReducers } from 'redux';

import optionsReducer from './reducer/optionsReducer.js';
import dataReducer from './reducer/dataReducer.js';

export default combineReducers({
  options: optionsReducer,
  data: dataReducer,
});
