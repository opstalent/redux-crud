import {
  OPTIONS_LOADED_TYPE,
  OPTIONS_LOAD_FAILED_TYPE
} from './actions.js';

const reducer = (state = {}, { type, payload }) => {
  switch (type){
    case OPTIONS_LOADED_TYPE:
    case OPTIONS_LOAD_FAILED_TYPE:
      return {
        ...state,
        [payload.namespace]: payload.response,
      };
    default: 
      return state;
  }
};

export default reducer;
