# `wildcardTransformer`
[`View source`](../../../src/path/wildcardTransformer.js)

> Function which transforms URL templates from Symfony router format to
> [`react-router`](https://github.com/ReactTraining/react-router) format.

Symfony router is using curly brackets to define wildcards in URL definition and
[`react-router`](https://github.com/ReactTraining/react-router) is using string preceeded
by colon.

`transformer` is used to transform URLs from Symfony format to format understandable
by [`react-router`](https://github.com/ReactTraining/react-router).

```js
wildcardTransformer(path);
```

#### Parameters

##### `path : string`

A path to transform.

#### Return value

Transformed path's `string`.
