import { expect } from 'chai';
import resolver from '../../src/routing/routeResolver.js';

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

describe('routing/routeResolver', () => {
  it('returns an array when object passed', () => {
    expect(resolver({})).to.be.an('array');
  });

  it('returns array of length same as passed array', () => {
    const arg = routeGenerator(3);
    expect(resolver(arg).length).to.equal(3);
  });

  it('returns an array of objects containing field `path`', () => {
    const arg = routeGenerator(3);
    resolver(arg).forEach(item => expect(item).to.include.key('path'));
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

  it('returns an array of objects containing field `component`', () => {
    const arg = routeGenerator(3);
    resolver(arg).forEach(item => expect(item).to.include.key('component'));
  });

  it('returns an array of objects containing field `strict`', () => {
    const arg = routeGenerator(3);
    resolver(arg).forEach(item => expect(item).to.include.key('strict'));
  });

  it('returns an array with objects which have field `strict` set to `false`', () => {
    const arg = routeGenerator(2);
    resolver(arg).forEach(item => expect(item.strict).to.equal(false));
  });

  it('returns an array of objects containing field `exact`', () => {
    const arg = routeGenerator(5);
    resolver(arg).forEach(item => expect(item).to.include.key('exact'));
  });

  it('returns an array with objects which have field `exact` set to `true`', () => {
    const arg = routeGenerator(2);
    resolver(arg).forEach(item => expect(item.exact).to.equal(true));
  });
});
