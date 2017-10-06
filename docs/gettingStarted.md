# Getting Started with `redux-crud`

If you want to implement `redux-crud` it's recommended to have basic knowledge on:
* [React](https://facebook.github.io/react/),
* [React Router](https://reacttraining.com/react-router/web/) basics,
* [Redux](http://redux.js.org/) state container.

## Basic Usage Guide

### 1. CRUD reducer

First thing after installation is to pass `crudReducer` into your store so `redux-crud` will be able to
store their states in your app's store.

```js
import { createStore, combineReducers } from 'redux';
import { reducer as crudReducer } from '@opstalent/redux-crud'

const rootReducer = combineReducers({
  // your other reducers here
  crud: crudReducer,
});

const store = createStore(rootReducer);
```

You have to pass `crudReducer` with key `crud`.

More details about `crudReducer` could be found in [API reference](api/reducer.md)

### 2. Route component

Second thing to do is to add `Route` component into your router's `Switch`.

```jsx
import { Route as CrudRoute } from '@opstalent/redux-crud';

const Router = () => (
  <Switch>
    { /* Your other routes here */ }
    <CrudRoute apiUrl="http://some-url.com" path="/some/path" />
  </Switch>
);
```

More details about `CrudRoute` could be found in [API reference](api/route.md)
