# `pageResolver`
[`View source`](../../../src/routing/pageResolver.js)

> Function used to resolve page to display by option type

```js
pageResolver(type);
```

#### Parameters

##### `type : string`

Type of page to display. Allowed types are:
- `add`,
- `edit`,
- `list`,
- `show`.

#### Return value

The `pageResolver` function returns React component.

If [`type`](#type--string) is not valid an `Error` will be thrown.
