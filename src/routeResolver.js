import transformer from './pathTransformer.js';
import creator from './pathCreator.js';

export default options => Object.values(options).reduce((acc, option = {}) => {
  acc.push({
    path: creator(transformer(option.url), option.action),
    component: null,
  });

  return acc;
}, []);
