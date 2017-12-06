import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { expect } from 'chai';

import TableHeader from '../../../src/page/table/TableHeader.js';
import TableHeaderCell from '../../../src/page/table/TableHeaderCell.js';

configure({ adapter: new Adapter() });

const baseProps = {
  templateResolver: {
    tableHeaderWrapper: () => 'tr',
    tableHeaderCell: () => 'th',
  },
  fields: {},
};

const renderHeader = (props = {}) =>
  shallow(<TableHeader { ...baseProps } { ...props } />);

const createHeaderInstance = (props = {}) =>
  new TableHeader({ ...baseProps, ...props });

describe('page/table/TableHeader', () => {
  it('is renderable', () => {
    expect(renderHeader).to.not.throw();
  });

  it('renders React element which has result of `templateResolver.tableHeaderWrapper()` as top level wrapper', () => {
    const Wrapper = ({ children }) => <tr>{ children }</tr>;
    const header = renderHeader({
      ...baseProps,
      templateResolver: {
        ...baseProps.templateResolver,
        tableHeaderWrapper: () => Wrapper,
      },
    });

    expect(header.type()).to.equal(Wrapper);
  });

  it('contains as many `TableHeaderCell` elements as valid items in `config.form` prop', () => {
    const header = renderHeader({
      ...baseProps,
      fields: {
        field1: { type: 'text' },
        field2: { type: 'email' },
      },
    });

    expect(header.find(TableHeaderCell).length).to.equal(2);
  });
});

describe('page/table/TableHeader.prepareHeaderCells', () => {
  it('is a function', () => {
    const instance = createHeaderInstance();
    expect(instance.prepareHeaderCells).to.be.a('function');
  });

  it('returns an array', () => {
    const instance = createHeaderInstance();
    expect(instance.prepareHeaderCells()).to.be.an('array');
  });

  it('returns an array with length same as number of variables in passed object', () => {
    const instance = createHeaderInstance();
    const config = {
      someValue: { type: 'text' },
      anotherValue: { type: 'file' },
    };

    expect(instance.prepareHeaderCells(config)).to.have.lengthOf(2);
  });

  it('returns array of `TableHeaderCell` elements', () => {
    const instance = createHeaderInstance();
    const config = {
      someValue: { type: 'text' },
      anotherValue: { type: 'file' },
    };

    const cells = instance.prepareHeaderCells(config);
    cells.map(element => expect(element.type).to.equal(TableHeaderCell));
  });
});

describe('page/table/TableHeader.prepareHeaderCell', () => {
  it('is a function', () => {
    const instance = createHeaderInstance();
    expect(instance.prepareHeaderCell).to.be.a('function');
  });

  it('returns a React element', () => {
    const instance = createHeaderInstance();
    expect(React.isValidElement(instance.prepareHeaderCell([]))).to.equal(true);
  });

  it('returns React element build from `TableHeaderCell` component', () => {
    const instance = createHeaderInstance();
    expect(instance.prepareHeaderCell([]).type).to.equal(TableHeaderCell);
  });

  it('passes `templateResolver.tableHeaderCell` resolver as `templateResolver` prop of returned element', () => {
    const resolver = () => 'th';
    const instance = createHeaderInstance({
      templateResolver: {
        tableHeaderCell: resolver,
      },
    });

    const props = instance.prepareHeaderCell([]).props;
    expect(props).to.have.property('templateResolver');
    expect(props.templateResolver).to.equal(resolver);
  });

  it('passes given key as `key` prop to returned element', () => {
    const instance = createHeaderInstance();

    const cell = instance.prepareHeaderCell(['some_key']);
    expect(cell.key).to.equal('some_key');
  });

  it('passes given config as `config` prop to returned element', () => {
    const config = { a: 1, b: 2 };
    const instance = createHeaderInstance();

    const cell = instance.prepareHeaderCell(['some_key', config]);
    expect(cell.props).to.have.property('config');
    expect(cell.props.config).to.deep.include(config);
  });
});
