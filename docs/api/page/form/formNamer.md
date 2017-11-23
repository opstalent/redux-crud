# `formNamer`
[`View source`](../../../../src/page/form/formNamer.js)

The `formName` function is component decorator used to provide compatibility with
[`reduxForm`](https://redux-form.com/7.2.0/docs/api/reduxform.md/) decorator.

```js
formNamer(WrappedComponent)
```

#### Parameters

##### `WrappedComponent : Component`

The component to wrap with component created by `formNamer` function.

#### Return value

The `formName` creates higher order component which assigns value from `match.key` prop to `form` prop of
wrapped component.
