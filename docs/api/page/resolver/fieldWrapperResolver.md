#`fieldWrapperResolver`
[`View source`](../../../../src/page/resolver/fieldWrapperResolver.js)

> Function used to render field wrapper.

```js
fieldWrapperResolver(type);
```

#### Parameters

##### `type : string`

Type of wrapper to render. Allowed types are:
- `add`,
- `edit`,
- `list`,
- `show`.

#### Return value

`fieldWrapperResolver` returns React component.

If `type` is not valid an `Error` will be thrown.
