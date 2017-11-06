import React from 'react';

export default (type, baseProps) => props => <input { ...props } { ...baseProps } type={ type } />;
