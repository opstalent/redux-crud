import {
  ENTITY_DATA_DOWNLOAD_SUCCEEDED_TYPE,
  ENTITY_DATA_DOWNLOAD_FAILED_TYPE,
} from '../actions.js';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case ENTITY_DATA_DOWNLOAD_SUCCEEDED_TYPE:
    case ENTITY_DATA_DOWNLOAD_FAILED_TYPE:
      return {
        ...state,
        [payload.namespace]: payload.response,
      };
    default:
      return state;
  }
};
