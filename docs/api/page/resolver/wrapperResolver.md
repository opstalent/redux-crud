#`wrapperResolver`
[`View source`](../../../../src/page/resolver/wrapperResolver.js)

> Function used to render page wrapper.

```js
wrapperResolver(type);
```

#### Parameters

##### `type : string`

Type of wrapper to render. Allowed types are:
- `add`,
- `edit`,
- `list`,
- `show`.

#### Return value

`wrapperResolver` returns React component.

If `type` is not valid an `Error` will be thrown.
