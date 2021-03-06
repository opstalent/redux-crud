import { expect } from 'chai';
import transformer from '../../src/path/wildcardTransformer.js';

describe('path/wildcardTransformer', () => {
  it('returns given string when no wildcards in it', () => {
    expect(transformer('string')).to.equal('string');
  });

  it('returns colon-wildcarded string when curly-bracket-wildcarded string is given and only wildcard occurs', () => {
    expect(transformer('{id}')).to.equal(':id');
  });

  it('returns colon-wildcarded string when curly-bracket-wildcarded string is given and wildcard is preceeded by slash', () => {
    expect(transformer('/{id}')).to.equal('/:id');
  });

  it('returns colon-wildcarded string when curly-bracket-wildcarded string is given and wildcard is trailed by slash', () => {
    expect(transformer('{id}/')).to.equal(':id/');
  });

  it('returns colon-wildcarded string when curly-bracket-wildcarded string is given and wildcard is trailed and preceeded by slash', () => {
    expect(transformer('/{id}/')).to.equal('/:id/');
  });

  it('returns colon-wildcarded string when curly-bracket-wildcarded string is given and wildcard is first of many parts of url-string', () => {
    expect(transformer('/{id}/test')).to.equal('/:id/test');
  });

  it('returns colon-wildcarded string when curly-bracket-wildcarded string is given and wildcard is last of many parts of url-string', () => {
    expect(transformer('last/{id}')).to.equal('last/:id');
  });

  it('returns colon-wildcarded string when curly-bracket-wildcarded string is given and wildcard is in the middle of many parts of url-string', () => {
    expect(transformer('last/{id}/middle')).to.equal('last/:id/middle');
  });

  it('returns colon-wildcarded string when multiple curly-bracket-wildcarded string is given', () => {
    expect(transformer('last/{id}/middle/{test}')).to.equal('last/:id/middle/:test');
  });

  it('returns given string when curly-bracket-wildcarded string is given and wildcard is in the middle of many parts of url-string but not surrounded by slashes', () => {
    expect(transformer('last{id}middle')).to.equal('last{id}middle');
  });
});
