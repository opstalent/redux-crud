# `page/EntityPage`
[`View source`](../../../src/page/EntityPage.js)

The `EntityPage` component fetches and displays details of entity defined in [`match.config`](#match--object-required) prop.

The `EntityPage` component is wrapped with following decorators:
- [`templated`](./templated.md)
- [`entityGetter`](./entityGetter.md)

## Methods reference

#### `resolveField(fieldConfig) : Element`

The `resolveField` method returns element from component generated by resolver given in
[`templateResolver.entityAttribute`](#templateresolver--object-required) prop.

The `fieldCOnfig` parameter has to be an array with two items:
1. `key` of given field,
2. `config` of field.

#### `prepareFields(list) : Array`

The `prepareFields` method is iterating field configs given in `list` parameter with
[`resolveField`](#resolvefieldfieldconfig--element) method.

Method is returning array of results from [`resolveField`](#resolvefieldfieldconfig--element) method.

## Props reference

#### `templateResolver : object` [required]

An object which aggregates template resolvers.

It has to have following methods:
- `pageWrapper` to render page's wrapper,
- `entityAttribute` to render entity attribute.

#### `match : object` [required]

An object with match for rendered [`Route`](../route.md).

It is required that `match` object has following structure:

```js
const match = {
  config: {
    form: {
      someField: {
        type: 'text',
      },
      anotherField: {
        type: 'number',
      },
      // ... more fields
    },
  },
  entity: {
    someField: 'value of someField',
    anotherField: 3,
    // ... more field's values
  },
};
```
