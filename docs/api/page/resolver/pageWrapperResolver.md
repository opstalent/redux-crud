#`pageWrapperResolver`
[`View source`](../../../../src/page/resolver/pageWrapperResolver.js)

> Function used to render page wrapper.

```js
pageWrapperResolver(type);
```

#### Parameters

##### `type : string`

Type of wrapper to render. Allowed types are:
- `form`,
- `list`,
- `show`.

#### Return value

`pageWrapperResolver` returns React component.

If `type` is not valid an `Error` will be thrown.
