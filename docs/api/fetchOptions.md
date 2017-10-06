# `fetchOptions`

> Function handling API call.

[`View source`](../../src/fetchOptions.js)

```js
fetchOptions(url, dispatch[, customClient]);
```

#### Parameters

##### `url : string`

A URL to be called with `OPTIONS` request.

##### `dispatch : Function`

Function used to dispatch an action.
By default it is a `store.dispatch` method passed by [`Loader`](loader.md) component.

If request is successful `fetchOptions` is raising `'REDUXCRUD_OPTIONS_LOADED'` action.
If request is failed `fetchOptions` is dispatching `'REDUXCRUD_OPTIONS_LOAD_FAILED'` action.

##### `customClient : Function` [optional]

Client used to send AJAX request.
If parameter is undefined [`axios`](https://github.com/axios/axios) is used.

#### Return value

`fetchOptions` is returning result of [`client`](#customclient--function-optional) function call.
