# `pathTransformer`
[`View source`](../../src/pathTransformer)

> Function transforming URL templates from Symfony router format to
> [`react-router`](https://github.com/ReactTraining/react-router) format.

Symfony router is using curly brackets to define wildcards in URL definition and
[`react-router`](https://github.com/ReactTraining/react-router) is using string preceeded
by colon.

`pathTransformer` is used to transform URLs from Symfony format to format understandable
by [`react-router`](https://github.com/ReactTraining/react-router).

```js
pathTransformer(path);
```

#### Parameters

##### `path : string`

A path to transform.

#### Return value

Transformed path's `string`.
