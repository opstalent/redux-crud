import React, { Component } from 'react';
import PropTypes from 'prop-types';

import resolverContainer from '../resolverContainer.js';

class FieldComponent extends Component
{
  constructor(props) {
    super(props);

    this.wrapper = this.getTemplateResolver().fieldWrapper(props.config.wrapperType);
    this.component = this.getTemplateResolver().field(props.config.type);
  }

  getTemplateResolver() {
    return this.props.templateResolver || resolverContainer;
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
  }),
  config: PropTypes.shape({
    label: PropTypes.string.isRequired,
    wrapperType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default FieldComponent;
