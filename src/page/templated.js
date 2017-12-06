import React, { Component } from 'react';

import resolverContainer from './resolverContainer.js';

const templated = (config = {}) => (WrappedComponent) => {
  class TemplatedComponent extends Component
  {
    getTemplateResolver() {
      return config.defaultResolver || resolverContainer;
    }

    render() {
      return (
        <WrappedComponent
          templateResolver={ this.getTemplateResolver() }
          { ...this.props }
        />
      );
    }
  }

  return TemplatedComponent;
}

export default templated;
