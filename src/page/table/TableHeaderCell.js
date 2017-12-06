import React from 'react';
import PropTypes from 'prop-types';

const TableHeaderCell = ({ templateResolver, type, config }) => {
  // @TODO: create `HeaderCell` component/template which will render as `<th>{ props.config.label }</th>`
  // and will be returned by `page/resolver/tableHeaderCellResolver
  const Wrapper = templateResolver(type);

  return (
    <Wrapper
      config={ config }
    />
  );
};

TableHeaderCell.defaultProps = {
  templateResolver: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  config: PropTypes.any,
}

export default TableHeaderCell;
