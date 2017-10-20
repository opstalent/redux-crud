import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import routeResolver from '../routing/routeResolver.js';
import matcher from '../routing/matcher.js';
import { URL_MATCH_FAILURE } from '../actions.js';

class PageSwitch extends React.Component {
  resolve() {
    const routes = this.props.routeResolver(this.props.options);
    try {
      const match = this.props.matcher(this.props.url, routes);
      const Component = match.component;

      return <Component
        handlerBuilder={ this.props.formHandlerBuilder }
        config={ match.config }
        form={ match.key }
        templateResolver={ this.props.templateResolver }
        />;
    } catch (error) {
      this.props.dispatch(URL_MATCH_FAILURE({
        url: this.props.url,
        options: this.props.options,
        error,
      }));

      return <div>Page not found</div>;
    }
  }

  render() {
    return this.resolve();
  }
}

PageSwitch.propTypes = {
  dispatch: PropTypes.func.isRequired,
  options: PropTypes.objectOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
  })).isRequired,
  url: PropTypes.string.isRequired,
  formHandlerBuilder: PropTypes.any,
  routeResolver: PropTypes.func,
  matcher: PropTypes.func,
  templateResolver: PropTypes.any,
};

PageSwitch.defaultProps = {
  routeResolver,
  matcher,
};

export {
  PageSwitch,
};

export default connect(null, dispatch => ({ dispatch }))(PageSwitch);
