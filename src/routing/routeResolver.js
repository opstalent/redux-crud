import transformer from '../path/wildcardTransformer.js';
import creator from '../path/creator.js';
import pageResolver from './pageResolver.js';

const resolveRoute = ([name, option]) => ({
  path: creator(transformer(option.url), option.action),
  component: pageResolver(option.action),
  exact: true,
  strict: false,
  config: option,
  key: name,
});

export default options => Object.entries(options).map(resolveRoute);

export {
  resolveRoute,
};
