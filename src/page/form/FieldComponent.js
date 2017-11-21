import React, { Component } from 'react';
import PropTypes from 'prop-types';

import templated from '../templated.js';

class FieldComponent extends Component
{
  constructor(props) {
    super(props);

    this.wrapper = this.props.templateResolver.fieldWrapper('form');
    this.component = this.props.templateResolver.field(props.config.type);
  }

  render() {
    const Wrapper = this.wrapper;
    const Component = this.component;

    const { templateResolver, ...props } = this.props;

    return (
      <Wrapper label={ this.props.config.label } field={ this.props.input.name }>
        <Component { ...props } />
      </Wrapper>
    );
  }
}

FieldComponent.propTypes = {
  templateResolver: PropTypes.shape({
    fieldWrapper: PropTypes.func.isRequired,
    field: PropTypes.func.isRequired,
  }).isRequired,
  config: PropTypes.shape({
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export { FieldComponent };

export default templated()(FieldComponent);
