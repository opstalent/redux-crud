# `pathCreator`

> Function creating path by URL given from API and action's type

[`View source`](../../src/pathCreator.js)

```js
pathCreator(url, action)
```

Function is creating URL for given action by concatenating given
base with action. It is verifying if base-url contains trailing slash,
if not it will add slash between parts.

#### Parameters

##### `url : string`

A base URL for creation.

##### `action : string`

An action which URL has to be created for.

Allowed values are:
* `show`,
* `list`,
* `add`,
* `edit`.

Exception will be thrown if provided parameter value is not in allowed values.

#### Return value

Function is returning given URL with added part at the end of string
which is containing `action` value.
