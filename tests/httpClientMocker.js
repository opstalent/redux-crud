import { spy } from 'sinon';

export default (passed, response = {}) =>
  spy(() => new Promise((resolve, reject) => {
    passed ? resolve(response) : reject({ response });
  }));
