import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { expect } from 'chai';
import { spy } from 'sinon';

import TableHeaderCell from '../../../src/page/table/TableHeaderCell.js';

configure({ adapter: new Adapter() });

const baseProps = {
  templateResolver: () => 'th',
  type: 'some_string',
};

const renderCell = (props = {}) =>
  shallow(<TableHeaderCell { ...baseProps } { ...props } />);

describe('page/table/TableHeaderCell', () => {
  it('is renderable', () => {
    expect(renderCell).to.not.throw();
  });

  it('renders React element build from component returned by `templateResolver` prop as top level wrapper', () => {
    const Component = ({ children }) => <th>{ children }</th>;
    const rendered = renderCell({
      templateResolver: () => Component,
    });

    expect(rendered.type()).to.equal(Component);
  });

  it('passes given type as argument to `templateResolver` prop', () => {
    const resolver = spy(() => 'th');
    const rendered = renderCell({
      templateResolver: resolver,
      type: 'some_type',
    });

    expect(resolver.getCall(0).args[0]).to.equal('some_type');
  });

  it('passes given config as `config` prop to rendered element', () => {
    const config = { a: 1, b: 2 };
    const Component = spy(() => <th />);
    const rendered = renderCell({
      templateResolver: () => Component,
      config,
    });

    rendered.html(); // render children of shallow wrapper

    const props = Component.getCall(0).args[0];
    expect(props).to.have.key('config');
    expect(props.config).to.deep.include(config);
  });

});
