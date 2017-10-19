import transformer from '../path/transformer.js';
import creator from '../path/creator.js';

export default options => Object.values(options).reduce((acc, option = {}) => {
  acc.push({
    path: creator(transformer(option.url), option.action),
    component: null, // @TODO: call component resolver
    exact: true,
    strict: false,
  });

  return acc;
}, []);
