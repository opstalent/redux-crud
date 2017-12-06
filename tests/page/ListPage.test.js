import React from 'react';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-15';
import { configure, shallow } from 'enzyme';
import { spy } from 'sinon';

import { ListPage } from '../../src/page/ListPage.js';
import TableHeader from '../../src/page/table/TableHeader.js';

configure({ adapter: new Adapter() });

const baseProps = {
  templateResolver: {
    pageWrapper: () => 'table',
    tableHeaderWrapper: () => 'tr',
    tableHeaderCell: () => 'th',
  },
  match: {
    config: {
      form: {
        fieldA: { type: 'text' },
        fieldB: { type: 'email' },
      },
    },
  },
};

const renderListPage = (props = {}) =>
  shallow(<ListPage { ...baseProps } { ...props } />);

const createListPageInstance = (props = {}) =>
  new ListPage({ ...baseProps, ...props });

describe('page/ListPage', () => {
  it('is renderable', () => {
    expect(renderListPage).to.not.throw();
  });

  it('renders result of `templateResolver.pageWrapper(\'list\')` as top level wrapper', () => {
    const Wrapper = () => <span />;
    const rendered = renderListPage({
      templateResolver: {
        ...baseProps.templateResolver,
        pageWrapper: () => Wrapper,
      },
    });

    expect(rendered.type()).to.equal(Wrapper);
  });

  it('passes `TableHeader` component into `header` prop of rendered element', () => {
    const rendered = renderListPage();
    const props = rendered.props();

    expect(props).to.have.property('header');
    expect(React.isValidElement(props.header)).to.equal(true);
    expect(props.header.type).to.equal(TableHeader);
  });
});

describe('page/ListPage.prepareHeader', () => {
  it('is a function', () => {
    const instance = createListPageInstance();
    expect(instance.prepareHeader).to.be.a('function');
  });

  it('returns React element build from `TableHeader` component', () => {
    const instance = createListPageInstance();
    const header = instance.prepareHeader();

    expect(React.isValidElement(header)).to.equal(true);
    expect(header.type).to.equal(TableHeader);
  });

  it('passes prop `match.config.form` into returned element as `fields` prop', () => {
    const fields = {
      a: { type: 'a' },
      b: { type: 'b' },
    };
    const instance = createListPageInstance({
      match: {
        config: {
          form: fields,
        },
      },
    });

    const header = instance.prepareHeader();
    expect(header.props).to.have.property('fields');
    expect(header.props.fields).to.deep.equal(fields);
  });

  it('passes down prop `templateResolver` into returned element', () => {
    const instance = createListPageInstance();
    const header = instance.prepareHeader();
    expect(header.props).to.have.property('templateResolver');
    expect(header.props.templateResolver).to.deep.include(baseProps.templateResolver);
  });
});

describe('page/ListPage.prepareContent', () => {
  it('is a function', () => {
    const instance = createListPageInstance();
    expect(instance.prepareContent).to.be.a('function');
  });
});
