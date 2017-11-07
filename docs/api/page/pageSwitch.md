# `PageSwitch`
[`View source`](../../../src/page/PageSwitch.js)

The `PageSwitch` component is mounting CRUD page from given URL and OPTIONS config.

When no matching page found `Page not found` message will be displayed and action
`REDUXCRUD_URL_MATCH_FAILURE` will be raised.

## Methods reference

#### `resolve() : Element`

Function which resolves component rendered by `PageSwitch`.
It is matching components by `url` passed with [`url`](#url--string-required) prop.

When no matching component found it is dispatching action `REDUXCRUD_URL_MATCH_FAILURE`
by calling method given in [`dispatch`](#dispatch--function-required) prop.

## Props reference

#### `dispatch : Function` [required]

A function used to dispatch actions raised by `Loader` component.

By default `store.dispatch` function is passed by
[`connect`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
HOC from `react-redux`.

#### `options : object` [required]

An object with OPTIONS config. Each item has to have following fields:

| key | type | description |
|---|---|---|
| url | string | URL of the endpoint |
| action | string | type of the endpoint |

#### `url : string` [required]

URL which will be used to match page from `options`.

#### `routeResolver : Function`

Function used to transform `options` from given format to format understandable by [`matcher`](#matcher--function).

By default [`routeResolver`](../routing/routeResolver.md) function is passed.

`routeResolver` callback requires to get `options` as only param and it is type of `object`.

Function has to return an `array` due to passing result to [`matcher`](#marcher--function) `routes` param.

#### `matcher : Function`

Function used to match url to given routes.

By default [`matcher`](../routing/matcher.md) function is passed.

`matcher` callback requires following params:

| name | type | description |
|---|---|---|
| url | string | An url to match against |
| routes | Array | A routes to match for |

Return value have to be an object which contains `component` property.

If no match found function have to throw an exception.

#### `formHandlerBuilder : any`

Form handler builder prop passed down to element returned by [`resolve`](#resolve) method.
