#`formHandlerBuilder`
[`View source`](../../../../src/page/form/formHandlerBuilder.js)

> Builder class which builds [`FormHandler`](./formHandler.md) instance.

## Methods reference

#### `build() : FormHandler`

Method which builds [`FormHandler`](./formHandler.md) from given parameters.

##### Return value

[`FormHandler`](./formHandler.md) instance.

#### `setUrl(url)`

Method used to set [`url`](./formHandler.md#config--object) parameter.

##### Parameters

###### `url : string`

URL of API's endpoint which is handling form.

#### `setBaseUrl(baseUrl)`

Method used to set [`baseUrl`](./formHandler.md#config--object) parameter.

##### Parameters

###### `baseUrl : string`

Base URL of API's endpoint which is handling form.

#### `setMethod(method)`

Method used to set [`method`](./formHandler.md#config--object) parameter.

##### Parameters

###### `method : string`

Method of HTTP request which will be sent to API with form's data.

#### `setDispatcher(dispatcher)`

Method used to set [`dispatcher`](./formHandler.md#dispatcher--function-optional) parameter.

##### Parameters

###### `dispatcher : Function`

Function which dispatches action.
