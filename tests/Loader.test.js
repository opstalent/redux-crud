import { expect } from 'chai';
import React from 'react'
import Enzyme, { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import {Loader} from '../src/Loader.js';

configure({ adapter: new Adapter() });

const requiredProps = {
  dispatch: () => {},
  fetchClient: () => new Promise(resolve => resolve()),
  apiUrl: 'http://google.com',
  endpoint: 'endpoint',
};

describe('Loader', () => {
  it('renders passed component', () => {
    const Renderer = () => <div>some content</div>;
    const wrapper = shallow((
      <Loader
        { ...requiredProps }
        customRenderer={ Renderer }
      />
    ));
    expect(wrapper.contains(<Renderer />)).to.equal(true);
  });
  it('renders "loading" when custom render is not passed', () => {
    const wrapper = shallow((
      <Loader { ...requiredProps }/>
    ));
    expect(wrapper.html()).to.contains('Loading...')
  });
  it('does not render loading when custom render is passed', () => {
    const Renderer = () => <div>Loading...</div>;
    const wrapper = shallow((
      <Loader { ...requiredProps }
              customRenderer={ Renderer }
      />
    ));
    expect(wrapper).to.not.contains(<div>Loading...</div>)
  });
});
