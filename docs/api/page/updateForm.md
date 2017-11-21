# `UpdateForm`
[`View source`](../../../src/page/UpdateForm.js)

The `UpdateForm` component is higher order component on [`CreateForm`](createForm.md)
which modifies behavior of form to handle edit forms.

The `UpdateForm` component is wrapped with following decorators:
- [`reduxForm`](https://redux-form.com/7.2.0/docs/api/reduxform.md/)
- [`formNamer`](./form/formNamer.md)
- [`entityGetter`](./entityGetter.md)
- [`connect`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)

## Props reference

The `UpdateForm` component is passing down its props to
[`CreateForm`](createForm.md#props-reference) component.

#### `match : object` [required]

An object with match for rendered [`Route`](../route.md).

It is required that `match` object has following structure:
```js
const match = {
  config: {
    url: '/user/{id}/',
  },
  params: {
    id: 2,
  },
};
```

Details of match structure could be found in [`matcher` reference](../routing/matcher.md).
