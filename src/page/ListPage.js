import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import templated from './templated.js';
import TableHeader from './table/TableHeader.js';

// @TODO: add list to `routing/pageResolver` under `list` key
class ListPage extends Component
{
  prepareHeader() {
    return (
      <TableHeader
        fields={ this.props.match.config.form }
        templateResolver={ this.props.templateResolver }
      />
    );
  }

  prepareContent() {
    // @TODO: create `TableContent` component which will be rendered as `tbody` with rows
  }

  render() {
    // @TODO: modify `page/resolver/pageWrapperResolver`: add `list` handler
    // @TODO: create TableWrapper component which will be returned by `pageWrapperResolver`
    // @TODO: `TableWrapper` has to accept `header` prop and render it inside of `thead`
    const Wrapper = this.props.templateResolver.pageWrapper('list');

    // @TODO: pass `content` prop with `this.prepareContent()` as a value
    return (
      <Wrapper
        header={ this.prepareHeader() }
      />
    );
  }
}

ListPage.propTypes = {
  templateResolver: PropTypes.shape({
    pageWrapper: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    config: PropTypes.shape({
      form: PropTypes.any,
    }).isRequired,
  }).isRequired,
};

export { ListPage };

export default compose(
  templated
)(ListPage);
