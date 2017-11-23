import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default (WrappedComponent) => {
  const NamedForm = props => (
    <WrappedComponent
      { ...props }
      form={ props.match.key }
    />
  );

  NamedForm.propTypes = {
    match: PropTypes.shape({
      key: PropTypes.string.isRequired,
    }).isRequired,
  };

  return NamedForm;
};
