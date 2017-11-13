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
      return ({ input }) => <textarea { ...input } />;
    case 'submit':
      return ({ input }) => <button { ...input } type="submit" />;
    case 'choice':
      return ({ config: { choices = {} }, input }) => (
        <select { ...input }>
          { Object.entries(choices).map(choice =>
            <option value={ choice[1] } key={ choice[1] }>{ choice[0] }</option>
          ) }
        </select>
      );
    default:
      throw new Error('Invalid argument passed to `fieldResolver`');
  }
};
