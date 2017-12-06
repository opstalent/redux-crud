import {
  DATA_DOWNLOAD_SUCCEEDED_TYPE,
  DATA_DOWNLOAD_FAILED_TYPE,
} from '../actions.js';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case DATA_DOWNLOAD_SUCCEEDED_TYPE:
    case DATA_DOWNLOAD_FAILED_TYPE:
      return {
        ...state,
        [payload.namespace]: payload.response,
      };
    default:
      return state;
  }
};
