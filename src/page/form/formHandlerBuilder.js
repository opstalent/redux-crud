import FormHandler from './formHandler.js';

class FormHandlerBuilder
{
  build() {
    return new FormHandler({
      url: this.url,
      baseUrl: this.baseUrl,
      method: this.method,
    }, this.dispatcher);
  }

  setUrl(url) {
    this.url = url;
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
  }

  setMethod(method) {
    this.method = method;
  }

  setDispatcher(dispatcher) {
    this.dispatcher = dispatcher;
  }
}

export default FormHandlerBuilder;
