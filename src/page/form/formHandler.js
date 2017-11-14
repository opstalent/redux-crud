import axios from 'axios';

import { FORM_SUBMISSION_SUCCEEDED, FORM_SUBMISSION_FAILED } from '../../actions.js'

const formHandler = function(config, dispatcher = () => {}) {
  const handler = (values) => {
    const httpClient = handler.httpClient || this.httpClient;

    return httpClient({
      method: this.method,
      baseUrl: this.baseUrl,
      url: this.url,
      data: values,
    }).then(response =>
      dispatcher(FORM_SUBMISSION_SUCCEEDED({ config, response }))
    ).catch(({ response }) =>
      dispatcher(FORM_SUBMISSION_FAILED({ config, response }))
    );
  };

  this.dispatcher = dispatcher;

  this.url = config.url;
  this.baseUrl = config.baseUrl;
  this.method = config.method;
  for (let key in this) {
    handler[key] = this[key];
  }

  return handler;
};

formHandler.prototype = {
  httpClient: axios,
};

export default formHandler;
