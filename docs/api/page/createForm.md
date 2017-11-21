# `CreateForm`
[`View source`](../../../src/page/CreateForm.js)

The `CreateForm` component displays and handles create form from given [`config`](#config--object-required). 

## Methods reference

#### `getPageResolver() : object`

The `getPageResolver` function returns template resolver.
If [`templateResolver`](`#templateresolver--object`) prop is defined function returns value of this prop.
Otherwise function returns [`resolverContainer`](./resolverContainer.md) object.

#### `getHandler() : Function`

The `getHandler` method returns form submission handler function.

#### `buildHandler() : Function`

The `buildHandler` method is getting form handler builder given in
[`handlerBuilder`](#handlerbuilder--object-required) prop and passing config variables to it.

Function is returning function which handles form submission.

#### `resolveField(fieldConfig) : Element`

The `resolveField` method returns [`Field`](https://redux-form.com/7.1.2/docs/api/field.md/) element
which is created from given `fieldConfig`.

The `fieldConfig` parameter has to be an array with two items:
1. `key` of given option,
2. content of given option.

#### `prepareFields(list) : Array`

The `prepareFields` method is iterating field configs given in `list` parameter with [`resolveField`](resolvefieldoptionarray--element) method.

Method returns array of [`Field`](https://redux-form.com/7.1.2/docs/api/field.md/) elements.

## Props reference

#### `config : object` [required]

An object with configuration of form which have to be rendered.

The `CreateForm` component is handling following fields of `config` prop:

| key | type | description | is required |
|---|---|---|---|
| form | object | Form field's config | x |
| url | string | URL of endpoint which handles form | ✓ |
| method | string | Method of HTTP request to send when submitting form | ✓ |

#### `handleSubmit : Function` [required]

Function to process form submission.

By default function given by [`reduxForm`](https://redux-form.com/7.1.1/docs/api/reduxform.md/) higher order component is passed.

#### `handlerBuilder : object` [required]

An object which is used to build form submission handler.

It has to have following methods:
- `setUrl` which accepts `url` parameter and passes it to built handler,
- `setMethod` which accepts `method` parameter and passes it to build handler,
- `build` which builds handler from previously set parameters.

#### `templateResolver : object` [required]

An object which aggregates template resolvers.

It has to have following methods:
- `pageWrapper` to render form's page wrapper.
