import { expect } from 'chai';

export default (reducer) => (type, payload, prevState, expectedState) => () => {
  const action = { type, payload };

  expect(reducer(prevState, action)).to.deep.equal(expectedState);
};
