const actionCreator = type => payload => ({
  type,
  payload,
});

export const OPTIONS_LOADED_TYPE = 'REDUXCRUD_OPTIONS_LOADED';
export const OPTIONS_LOAD_FAILED_TYPE = 'REDUXCRUD_OPTIONS_LOAD_FAILED';
export const URL_MATCH_FAILURE_TYPE = 'REDUXCRUD_URL_MATCH_FAILURE';

export const OPTIONS_LOADED = actionCreator(OPTIONS_LOADED_TYPE);
export const OPTIONS_LOAD_FAILED = actionCreator(OPTIONS_LOAD_FAILED_TYPE);
export const URL_MATCH_FAILURE = actionCreator(URL_MATCH_FAILURE_TYPE);
