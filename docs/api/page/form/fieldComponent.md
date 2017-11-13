# `FieldComponent`
[`View source`](../../../../src/page/form/FieldComponent.js)

The `FieldComponent` component resolves and renders form fields by given props.

## Methods reference

#### `getTemplateResolver() : object`

`getTemplateResolver` function returns template resolver object.

It returns [`templateResolver`](#templateresolver--object) prop if it is defined.
Otherwise [`resolverContainer`](../resolverContainer.md) object is returned.

## Props reference

#### `templateResolver : object`

Object which contains resolvers for field wrapper and field component.

It has to include following resolvers:
- `fieldWrapper` for resolving field wrapper,
- `field` for resolving form field.

#### `config : object` [required]

Object which contains configuration for rendering `FieldComponent`.

It has to have following properties:
- `label` which contains content of field label,
- `wrapperType` which contains type of displayed page,
- `type` which contains type of field to display.

#### `input : object` [required]

Object which contains properties for rendered field.

It has to include following fields:
- `name` which contains input's name.
