import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Aggregations from 'components/aggregations';
import { Provider } from 'react-redux';
import initStore from 'stores';

class Plugin extends Component {
  static displayName = 'AggregationsPlugin';

  static propTypes = {
    store: PropTypes.object
  }


  /**
   * Connect the Plugin to the store and render.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <Provider store={this.props.store}>
        <Aggregations />
      </Provider>
    );
  }
}

export default Plugin;
export { Plugin, initStore };
