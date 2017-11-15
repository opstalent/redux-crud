import { expect } from 'chai';

import CreateForm from '../../src/page/CreateForm.js';
import resolver, { resolveRoute } from '../../src/routing/routeResolver.js';

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
});

describe('routing/routeResolver.resolveRoute', () => {
  it('returns object', () => {
    const resolved = resolveRoute(['route_name', {
      url: '/some/url',
      action: 'list',
    }]);

    expect(resolved).to.be.an('object');
  });

  it('returns object containing field `path`', () => {
    const resolved = resolveRoute(['route_name', {
      url: '/some/url',
      action: 'list',
    }]);

    expect(resolved).to.include.key('path');
  });

  it('returns an object which has path matching simple URL passed with OPTION', () => {
    const resolved = resolveRoute(['route_name', {
      url: '/users',
      action: 'edit',
    }]);

    expect(resolved).to.include({ path: '/users/edit' });
  });

  it('returns an object which has path matching wildcarded URL passed with OPTION', () => {
    const resolved = resolveRoute(['route_name', {
      url: '/user/{id}',
      action: 'add',
    }]);

    expect(resolved).to.include({ path: '/user/:id/add' });
  });

  it('returns an object containing field `component`', () => {
    const resolved = resolveRoute(['route_name', {
      url: '/some/url',
      action: 'list',
    }]);

    expect(resolved).to.include.key('component');
  });

  it('returns an object containing `CreateForm` component when given `action` is `add`', () => {
    const resolved = resolveRoute(['route_name', {
      url: '/some/url',
      action: 'add',
    }]);

    expect(resolved.component).to.equal(CreateForm);
  });

  it('returns an object containing field `strict`', () => {
    const resolved = resolveRoute(['route_name', {
      url: '/some/url',
      action: 'list',
    }]);

    expect(resolved).to.include.key('strict');
  });

  it('returns an object which have field `strict` set to `false`', () => {
    const resolved = resolveRoute(['route_name', {
      url: '/some/url',
      action: 'list',
    }]);

    expect(resolved.strict).to.equal(false);
  });

  it('returns an object containing field `exact`', () => {
    const resolved = resolveRoute(['route_name', {
      url: '/some/url',
      action: 'list',
    }]);

    expect(resolved).to.include.key('exact');
  });

  it('returns an object which have field `exact` set to `true`', () => {
    const resolved = resolveRoute(['route_name', {
      url: '/some/url',
      action: 'list',
    }]);

    expect(resolved.exact).to.equal(true);
  });

  it('returns an object containing field `config`', () => {
    const resolved = resolveRoute(['route_name', {
      url: '/some/url',
      action: 'list',
    }]);

    expect(resolved).to.include.key('config');
  });

  it('returns an object which have field `config` with passed option', () => {
    const option = {
      url: '/some/url',
      action: 'add',
    };

    expect(resolveRoute(['route_name', option]).config).to.deep.equal(option);
  });

  it('returns an object containing field `key`', () => {
    const resolved = resolveRoute(['route_name', {
      url: '/some/url',
      action: 'list',
    }]);

    expect(resolved).to.include.key('key');
  });

  it('returns an object which have field `key` with passed name', () => {
    const resolved = resolveRoute(['route_name', {
      url: '/some/url',
      action: 'list',
    }]);

    expect(resolved.key).to.equal('route_name');
  });
});
