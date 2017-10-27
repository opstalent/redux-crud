import React from 'react';

import inputGenerator from './field/inputGenerator.js';

export default (type) => {
  switch (type) {
    case 'date':
    case 'datetime':
    case 'email':
    case 'file':
    case 'number':
    case 'password':
    case 'text':
      return inputGenerator(type);
    case 'textarea':
      return props => <textarea { ...props } />;
    case 'submit':
      return props => <button { ...props } type="submit" />;
    default:
      throw new Error('Invalid argument passed to `resolver`');
  }
};
