import { compile, parse } from 'path-to-regexp';

import pathTransformer from './wildcardTransformer.js';

const prepareParams = (params, tokens, useCurlyBrackets = false) => tokens.reduce(((carry, token) => {
  if (typeof (token) !== 'object') {
    return carry;
  }

  return {
    ...carry,
    [token.name]: params[token.name] || (useCurlyBrackets ? `{${token.name}}` : `:${token.name}`),
  };
}), {});

export default (path = '', params = {}) => {
  const transformedPath = pathTransformer(path);
  const isCurlyBracket = path !== transformedPath;

  const preparedParams = prepareParams(params, parse(transformedPath), isCurlyBracket);

  const solver = compile(transformedPath);

  return decodeURIComponent(solver(preparedParams));
};
