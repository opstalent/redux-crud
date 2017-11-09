# `Route`
[`View source`](../../src/Route.js)

The `Route` component extends
[`Route`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Route.md)
from [`react-router`](https://github.com/ReactTraining/react-router).
It is using matching engine to mount [`Loader`](loader.md) component which is sending `OPTIONS` request to API.
When `OPTIONS` data loaded it is rendering [`Switch`](page/switch.md) component
which is mounting required CRUD page.

## Methods reference

#### `getNamespace() : string`

Method returns namespace of `Route`. Namespace is concatenated from
[`apiUrl`](#apiurl--string-required) and [`path`](#path--string-required) props.

#### `getOptions() : object | undefined`

Method returns options object for [namespace](#getNamespace--string) of `Route`.
If no matching options `undefined` is returned.

#### `isLoaded() : bool`

Method returns `true` if [options](#getOptions--object--undefined) for `Route` are defined.
If there are no options `false` is returned.

#### `onMatch(props) : Element`

Method returns [`PageSwitch`](./page/pageSwitch.md) element when
[`isLoaded`](#isloaded--bool) method returns `true`. Otherwise it returns
[`Loader`](./loader.md) element.

#### `createFormHandlerBuilder() : [FormHandlerBuilder](./page/formHandler/formHandlerBuilder.md)`

Method is creating instance of class given by [`formHandlerBuilderClass`](#formhandlerbuilderclass--function) prop. 
and passing to the `builder`:
- [`apiUrl`](#apiurl--string-required) by method [`setBaseUrl`](./page/formHandler/formHandlerBuilder.md#setbaseurlbaseurl),
- [`dispatch`](#dispatch--function-required) by method [`setDispatcher`](./page/formHandler/formHandlerBuilder.md#setdispatcherdispatcher).

## Props reference

#### `path : string` [required]

Path to endpoint which have to be called with `OPTIONS` request by
[`Loader`](loader.md) component.

#### `apiUrl : string` [required]

Base URL of API called by `OPTIONS` request.

#### `loaderComponent : Component`

A component to render instead of default `Loading...`
message when [`Loader`](loader.md) is waiting for response.

Details can be found in [reference of `Loader` component](loader.md).

#### `options : object`

Object containing responses for already called `OPTIONS` requests.

By default object is passed by
[`connect`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
HOC from `react-redux` and holds results from `store.crud`.

#### `fetchClient : any`

Optional HTTP client passed to [`Loader`](loader.md) component.

Details can be found in [reference of `Loader` component](loader.md).

#### `formHandlerBuilderClass : Function`

Class of form builder created by [`createFormHandlerBuilder`](#createformhandlerbuilder)
method and passed to [`PageSwitch`](./page/pageSwitch.md) element.

Default value of property is [`FormHandlerBuilder`](./page/formHandler/formHandlerBuilder.md).

#### `dispatch : Function` [required]

A function used to dispatch actions.

By default `store.dispatch` function is passed by
[`connect`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
HOC from `react-redux`.
