import { expect } from 'chai';
import resolver from '../src/routeResolver.js';

const routeGenerator = (length) => {
  const arr = {};
  for (let i = 0; i < length; i++) {
    arr[`some_route_${i}`] = {
      url: '/some_page',
      action: 'edit',
    };
  }

  return arr;
};

describe('routeResolver', () => {
  it('returns an array when object passed', () => {
    expect(resolver({})).to.be.an('array');
  });

  it('returns array of length same as passed array', () => {
    const arg = routeGenerator(3);
    expect(resolver(arg).length).to.equal(3);
  });

  it('returns an array of objects containing fields `path` and `component`', () => {
    const arg = routeGenerator(3);
    resolver(arg).forEach(item => expect(item).to.include.keys('path', 'component'));
  });

  it('returns an array with object which has path matching simple URL passed with OPTION', () => {
    const arg = {
      'users_list': {
        url: '/users',
        action: 'edit',
      },
    };
    expect(resolver(arg)[0]).to.include({ path: '/users/edit' });
  });

  it('returns an array with object which has path matching wildcarded URL passed with OPTION', () => {
    const arg = {
      'users_list': {
        url: '/user/{id}',
        action: 'add',
      },
    };
    expect(resolver(arg)[0]).to.include({ path: '/user/:id/add' });
  });
});
