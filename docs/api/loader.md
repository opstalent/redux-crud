# `Loader`
[`View source`](../../src/Loader.js)

The `Loader` component is used to call OPTIONS endpoint from API when `Route` path is matched.

By default all props are passed to `Loader` from [`Route`](route.md) component and it's
not needed to configure anything to work with `Loader`.

## Props reference

#### `dispatch : Function` [required]

A function used to dispatch actions raised by `Loader` component.

By default `store.dispatch` function is passed by
[`connect`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
HOC from `react-redux`.

#### `fetchClient : Function` [required]

A function used by `Loader` to send AJAX request to API.

By default [`axios`](https://github.com/axios/axios#axios-api) is passed.

`fetchClient` callback requires to get `config` as first param. `config` has to have following fields:

| key | type | description |
|---|---|---|
| url | string | URL to call |
| method | string | Method of HTTP request |

`fetchClient` function has to return `Promise` object.

#### `customRenderer : Component`

A component to render instead of default `Loading...` message.

[`match`](#match--any) property is passed into component which would be rendered.

#### `match : any`

Match object passed from [`Route`](./route.md) component.

#### `options : object`

Object containing responses for already called `OPTIONS` requests.

By default object is passed by
[`connect`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
HOC from `react-redux` and holds results from `store.crud`.

#### `apiUrl : string` [required]

Base URL of API called by `OPTIONS` request.

#### `endpoint : string` [required]

Path to endpoint which have to be called with `OPTIONS` request by `Loader` component.
