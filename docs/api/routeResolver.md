# `routeResolver`
[`View source`](../../src/routeResolver)

> Function used to resolve route's params from given OPTIONS

```js
routeResolver(options);
```

#### Parameters

##### `options : object`

Object containing response from API's OPTIONS for given URL.

#### Return value

An array with objects containing resolved parameters needed to render component for given route.
Each object is containing following fields:
* `path` containing path understandable by [`react-router`](https://github.com/ReactTraining/react-router),
* `component` containing component to render with given `path`.
