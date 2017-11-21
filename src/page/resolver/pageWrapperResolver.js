import React from 'react';

export default (type) => {
  switch(type) {
    case 'add':
      return ({ config, ...props }) => <form { ...props } />;
    case 'edit':
    case 'list':
    case 'show':
      return 'div';
    default:
      throw new Error('Invalid argument passed to `resolver`');
  }
};
