# `CreateForm`
[`View source`](../../../src/page/CreateForm.js)

The `CreateForm` component displays and handles create form from given [`config`](#config--object-required). 

## Methods reference

#### `getHandler() : Function`

The `getHandler` method returns form submission handler function.

#### `buildHandler() : Function`

Method which returns function which handles form submission.

The `buildHandler` method is creating new [`formHandler`](./form/formHandler.md) object.
It is passing to its config following props:
- [`apiUrl`](#apiurl--string-required),
- [`match.config.method`](#match--object-required),
- [`match.config.url`](#match--object-required).

If [`fetchClient`](#fetchclient--function) is defined it passes it overloads handler's `httpClient` method with it.

#### `resolveField(fieldConfig) : Element`

The `resolveField` method returns [`Field`](https://redux-form.com/7.1.2/docs/api/field.md/) element
which is created from given `fieldConfig`.

The `fieldConfig` parameter has to be an array with two items:
1. `key` of given option,
2. content of given option.

#### `prepareFields(list) : Array`

The `prepareFields` method is iterating field configs given in `list` parameter with [`resolveField`](#resolvefieldfieldconfig--element) method.

Method returns array of [`Field`](https://redux-form.com/7.1.2/docs/api/field.md/) elements.

## Props reference

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
        type: 'date',
      },
      // ... more fields
    },
  },
  url: '/user',
  method: 'POST',
};
```

Details of match structure could be found in [`matcher` reference](../routing/matcher.md).

Allowed field types depends on [`fieldResolver`](./resolver/fieldResolver.md)
passed in [`templateResolver.field`](#templateresolver--object-required).

#### `handleSubmit : Function` [required]

Function to process form submission.

By default function given by [`reduxForm`](https://redux-form.com/7.1.1/docs/api/reduxform.md/) higher order component is passed.

#### `templateResolver : object` [required]

An object which aggregates template resolvers.

It has to have following methods:
- `fieldWrapper` to render form field's wrapper,
- `pageWrapper` to render form's page wrapper.

#### `apiUrl : string` [required]

Base URL of API called by form handler generated in [`buildHandler`](#buildhandler--function) method.

#### `fetchClient : Function`

Optional HTTP client passed to [`formHandler`](./form/formHandler) object built by
[`buildHandler`](#buildhandler--function) method.

Details could be found in [`formHandler` reference](./form/formHandler#overriding-default-http-client).

#### `dispatch : Function` [required]

A function used to dispatch actions.

By default `store.dispatch` function is passed by
[`connect`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
HOC from `react-redux`.
