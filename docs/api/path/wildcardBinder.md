# `wildcardBinder`
[`View source`](../../../src/path/wildcardBinder.js)

> Function which binds wildcarded url with given params.

```js
wildcardBinder(path[, params])
```

#### Parameters

#### `path : string`

A path to bind.

#### `params : object`

Associative array with values of wildcards of [`path` parameter](#path--string).

##### Return value

Path binded with params from [`params` parameter](#params--object).

If some params are not defined wildcard is not changed.
