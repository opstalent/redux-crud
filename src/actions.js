const actionCreator = type => payload => ({
  type,
  payload,
});

export const OPTIONS_LOADED_TYPE = 'REDUXCRUD_OPTIONS_LOADED';
export const OPTIONS_LOAD_FAILED_TYPE = 'REDUXCRUD_OPTIONS_LOAD_FAILED';

export const OPTIONS_LOADED = actionCreator(OPTIONS_LOADED_TYPE);
export const OPTIONS_LOAD_FAILED = actionCreator(OPTIONS_LOAD_FAILED_TYPE);
