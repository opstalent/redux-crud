import React from 'react';

export default (type, baseProps) => ({ input }) => <input { ...input } { ...baseProps } type={ type } />;
