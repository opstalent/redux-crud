import React from 'react';

export default (type) => {
  switch(type) {
    case 'add':
      return ({ label, field, children, ...props }) => (
        <div { ...props }>
          <label htmlFor={ field }>{ label }</label>
          { children }
        </div>
      );
    default:
      throw new Error('Invalid type passed to `fieldWrapperResolver`');
  }
};
