#`fieldResolver`
[`View source`](../../../../src/page/resolver/fieldResolver.js)

> Function used to render page fields.

```js
fieldResolver(type);
```

#### Parameters

##### `type : string`

Type of field to render. Allowed types are:
- `choice`,
- `date`,
- `datetime`,
- `email`,
- `file`,
- `number`,
- `password`,
- `submit`,
- `text`,
- `textarea`.

#### Return value

`fieldResolver` returns React stateless component.

If `type` is not valid an `Error` will be thrown.
