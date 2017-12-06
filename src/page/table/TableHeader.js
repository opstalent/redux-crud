import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableHeaderCell from './TableHeaderCell';

class TableHeader extends Component
{
  prepareHeaderCell = ([key, config = {}]) => {
    // @TODO: create `page/resolver/tableHeaderCellResolver`
    // @TODO: modify `page/resolverContainer`: add `tableHeaderCell`
    return (
      <TableHeaderCell
        templateResolver={ this.props.templateResolver.tableHeaderCell }
        key={ key }
        config={ config }
      />
    );
  }

  prepareHeaderCells(cellsConfig = {}) {
    return Object.entries(cellsConfig).map(this.prepareHeaderCell);
  }

  render() {
    // @TODO: create `page/resolver/tableRowWrapperResolver`
    // @TODO: modify `page/resolverContainer`: add `tableHeaderWrapper`
    const Wrapper = this.props.templateResolver.tableHeaderWrapper();

    return (
      <Wrapper>
        { this.prepareHeaderCells(this.props.fields) }
      </Wrapper>
    );
  }
}

TableHeader.propTypes = {
  templateResolver: PropTypes.shape({
    tableHeaderWrapper: PropTypes.func.isRequired,
    tableHeaderCell: PropTypes.func.isRequired,
  }).isRequired,
  fields: PropTypes.objectOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
  })).isRequired,
};

export default TableHeader;
