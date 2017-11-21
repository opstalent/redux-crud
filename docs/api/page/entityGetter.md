# `entityGetter`
[`View source`](../../../src/page/entityGetter.js)

```js
entityGetter(WrappedComponent);
```

The `entityGetter` function is component decorator which downloads details of entity from API.

## Methods reference

#### `fetchData()`

The `fetchData` method sends HTTP request to get data of edited entity.

When client succeeds it is dispatching `REDUXCRUD_ENTITY_DATA_DOWNLOAD_SUCCEEDED_TYPE` action.
Otherwise `REDUXCRUD_ENTITY_DATA_DOWNLOAD_FAILED_TYPE` action is dispatched.

Method uses HTTP client given in [`httpClient`](#httpclient--function-required) prop.

Method uses function given in [`dispatch`](#dispatch--function-required) prop to dispatch actions.

## Props reference

#### `fetchClient : Function`

Optional HTTP client passed to [`formHandler`](./form/formHandler) object built by
[`buildHandler`](#buildhandler--function) method.

Details could be found in [`formHandler` reference](./form/formHandler#overriding-default-http-client).

#### `dispatch : Function` [required]

A function used to dispatch actions.

By default `store.dispatch` function is passed by
[`connect`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
HOC from `react-redux`.

#### `entityData : object` [required]

Object containing responses for requests sent by [`fetchData`](#fetchdata) method.

Details of `entityData` object's structure could be found in [`reducer` reference](../reducer.md).

By default object is passed by
[`connect`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
HOC from `react-redux` and holds results from `store.crud.entityData`.

#### `match : object` [required]

An object with match for rendered [`Route`](../route.md).

It is required that `match` object has following structure:
```js
const match = {
  config: {
    url: '/user/{id}/',
  },
  params: {
    id: 2,
  },
};
```
