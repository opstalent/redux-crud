import React from 'react';
import PropTypes from 'prop-types';

const FlatFieldDescription = ({ config: { label }, value }) => (
  <div>
    <dt>{ label }</dt>
    <dd>{ value }</dd>
  </div>
);

FlatFieldDescription.propTypes = {
  config: PropTypes.shape({
    label: PropTypes.string,
  }).isRequired,
  value: PropTypes.string,
};

export default FlatFieldDescription;
