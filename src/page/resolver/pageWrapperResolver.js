import React from 'react';

export default (type) => {
  switch(type) {
    case 'form':
      return ({ config, ...props }) => <form { ...props } />;
    case 'show':
      return ({ config, ...props }) => <dl { ...props } />;
    case 'list':
      return 'div';
    default:
      throw new Error('Invalid argument passed to `resolver`');
  }
};
