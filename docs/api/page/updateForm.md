# `UpdateForm`
[`View source`](../../../src/page/UpdateForm.js)

The `UpdateForm` component is higher order component on [`CreateForm`](createForm.md).

The `UpdateForm` provides `initialValues` for [`CreateForm`](createForm.md).

## Methods reference

#### `getInitialValues() : object`

The `getInitialValues` function returns an object with key-value pairs where key is a
form field's name and value is initial value of this field.

## Props reference

The `UpdateForm` component is passing down its props to
[`CreateForm`](createForm.md#props-reference) component.

#### `config : object` [required]

An object with configuration of form which have to be rendered.

The `UpdateForm` component is reading form config and gets initial values for fields.

The `UpdateForm` component is handling following fields of `config` prop:

| key | type | description | is required |
|---|---|---|---|
| form | object | Form field's config | ✓ |

If `form` object item has key `data` it is passed down as initial value of field rendered
from this item.
