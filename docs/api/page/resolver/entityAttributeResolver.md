# `entityAttributeResolver`
[`View source`](../../../../src/page/resolver/entityAttributeResolver.js)

> Function used to render entity details attribute.

```js
entityAttributeResolver(type);
```

#### Parameters

##### `type : string`

Type of field to render. Allowed types are:
- `date`,
- `datetime`,
- `email`,
- `number`,
- `text`.

#### Return value

The `entityAttributeResolver` returns React component.

If `type` is not valid an `Error` will be thrown.
