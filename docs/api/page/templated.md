# `templated`
[`View source`](../../../src/page/templated.js)

```js
templated(config)(WrappedComponent);
```

The `templated` function is component decorator which passes `templateResolver` prop
into wrapped component.

## Parameters

#### `config : object`

##### `defaultResolver : object`

The `defaultResolver` config field is a resolver passed down to wrapped component.

If not defined [`resolverContainer`](./resolverContainer.md) is passed.
