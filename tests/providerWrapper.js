import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

export default (defaultState = {}) => WrappedComponent => props => (
  <Provider store={ configureStore()(defaultState) }>
    <WrappedComponent { ...props } />
  </Provider>
);
