# `FlatFieldDescription`
[`View source`](../../../../../src/page/resolver/field/FlatFieldDescription)

The `FlatFieldDescription` component is returned by
[`entityAttributeResolver`](resolver/entityAttributeResolver.md) when flat type passed.

Component renders as item of
[definition list](https://www.w3.org/TR/html401/struct/lists.html#h-10.3).

## Props reference

#### `config : object` [required]

An object which contains following attributes:
- `label` which is rendered as [definition term](https://www.w3.org/TR/html401/struct/lists.html#edef-DT).

#### `value : string`

An string which is rendered as [definition description](https://www.w3.org/TR/html401/struct/lists.html#edef-DD).
