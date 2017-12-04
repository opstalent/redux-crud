import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import templated from './templated.js';
import dataGetter from './dataGetter.js';

class EntityPage extends React.Component
{
  constructor(props) {
    super(props);

    this.pageWrapper = props.templateResolver.pageWrapper('show');
  }

  resolveField = ([ key, config = {} ]) => {
    const Component = this.props.templateResolver.entityAttribute(config.type);

    return (
      <Component
        key={ key }
        config={ config }
        value={ this.props.entity[key] }
      />
    );
  };

  prepareFields(list = {}) {
    return Object.entries(list).map(this.resolveField);
  }

  render() {
    const Wrapper = this.pageWrapper;
    const children = this.prepareFields(this.props.match.config.form);

    return (
      <Wrapper>
        { children }
      </Wrapper>
    );
  }
}

EntityPage.propTypes = {
  templateResolver: PropTypes.shape({
    pageWrapper: PropTypes.func.isRequired,
    entityAttribute: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    config: PropTypes.shape({
      form: PropTypes.objectOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
  entity: PropTypes.object.isRequired,
};

export { EntityPage };

export default compose(
  dataGetter,
  templated
)(EntityPage);
