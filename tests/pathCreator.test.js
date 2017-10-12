import { expect } from 'chai';
import creator from '../src/pathCreator.js';

describe('pathCreator', () => {
  it('returns string', () => {
    expect(creator('some_url', 'list')).to.be.a('string');
  });

  it('returns given string with concatenated action when action is `show` and URL has trailig slash', () => {
    expect(creator('some_url/', 'show')).to.equal('some_url/show')
  });

  it('returns given string with concatenated action when action is `list` and URL has trailig slash', () => {
    expect(creator('some_url/', 'list')).to.equal('some_url/list')
  });

  it('returns given string with concatenated action when action is `add` and URL has trailig slash', () => {
    expect(creator('some_url/', 'add')).to.equal('some_url/add')
  });

  it('returns given string with concatenated action when action is `edit` and URL has trailig slash', () => {
    expect(creator('some_url/', 'edit')).to.equal('some_url/edit')
  });

  it('throws an exception when action is `delete`', () => {
    expect(() => creator('some_url', 'delete')).to.throw(Error);
  });

  it('throws an exception when action is `dummy`', () => {
    expect(() => creator('some_url', 'dummy')).to.throw(Error);
  });

  it('returns given string with concatenated action and slash between tem when action is valid and no trailing slash in the URL', () => {
    expect(creator('some_url', 'edit')).to.equal('some_url/edit');
  });
});
