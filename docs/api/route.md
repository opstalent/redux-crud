# `Route`
[`View source`](../../src/Route.js)

The `Route` component extends
[`Route`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Route.md)
from [`react-router`](https://github.com/ReactTraining/react-router).
It is using matching engine to mount [`Loader`](loader.md) component.

## Props reference

#### `path : string` [required]

Path to endpoint which have to be called with `OPTIONS` request by
[`Loader`](loader.md) component.

#### `apiUrl : string` [required]

Base URL of API called by `OPTIONS` request.

#### `loaderComponent : Component`

A component to render instead of default `Loading...`
message when [`Loader`](loader.md) is waiting for response.

Details could be found in [reference of `Loader` component](loader.md).
