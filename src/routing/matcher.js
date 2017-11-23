import { matchPath } from 'react-router';

export default (url, routes = []) => {
  if (!(routes instanceof Array)) {
    throw new TypeError('Invalid argument type: `routes` has to be an array');
  }

  for (let i = 0; i < routes.length; ++i) {
    let match = matchPath(url, routes[i]);
    if (match) {
      return {
        ...routes[i],
        params: match.params,
      };
    }
  }

  throw new Error('No item matches given routes');
};
