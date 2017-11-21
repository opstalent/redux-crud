# `FieldComponent`
[`View source`](../../../../src/page/form/FieldComponent.js)

The `FieldComponent` component resolves and renders form fields by given props.

The `FieldComponent` component is wrapped with [`templated`](../templated.md) decorator.

## Props reference

#### `templateResolver : object` [required]

Object which contains resolvers for field wrapper and field component.

It has to include following resolvers:
- `fieldWrapper` for resolving field wrapper,
- `field` for resolving form field.

#### `config : object` [required]

Object which contains configuration for rendering `FieldComponent`.

It has to have following properties:
- `label` which contains content of field label,
- `type` which contains type of field to display.

#### `input : object` [required]

Object which contains properties for rendered field.

It has to include following fields:
- `name` which contains input's name.
