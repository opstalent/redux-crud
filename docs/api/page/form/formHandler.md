#`formHandler`
[`View source`](../../../../src/page/form/formHandler.js)

> Class which is creating function used to handle form submission.
> It is fully compatible with [`redux-form`](https://github.com/erikras/redux-form).

```js
new formHandler(config[, dispatcher])
```

#### Parameters

##### `config : object`

A set of key/value pairs to configure `formHandler` instance.

Available config options are listed below.

| Key | Description |
|-|-|
|`method`|HTTP request's method|
|`baseUrl`|Value which will be prepend to `url`|
|`url`|Address used for the request|

##### `dispatcher : Function` [optional]

A function used to dispatch actions.

#### Return value

`formHandler` class is function in its constructor
so result of `new formHandler(config)` can be directly invoked.

Function handles argument `values` which is used to pass form's values.

Result of function is a
[`Promise`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Promise) instance.

#### Examples

##### Handling server's response

```js
import FormHandler from '@opstalent/redux-crud/page/form/formHandler.js';

const handler = new FormHandler({
  baseUrl: 'http://dummy.com',
  url: '/dummy',
  method: 'POST',
});

const data = {
  someField: 'someValue',
};

handler(data)
  .then((response) => {
    // handle `response` here
  });
```

##### Overriding default HTTP client

```js
import FormHandler from '@opstalent/redux-crud/page/form/formHandler.js';

const handler = new FormHandler({
  baseUrl: 'http://dummy.com',
  url: '/dummy',
  method: 'POST',
});

const data = {
  someField: 'someValue',
};

const customHttpClient = values => new Promise((resolve, reject) => {
  // sending form values here...
});

handler.httpClient = customHttpClient;

handler(data);
```
