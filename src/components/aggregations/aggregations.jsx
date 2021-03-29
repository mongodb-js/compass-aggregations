import React, { Component } from 'react';
import { connect } from 'react-redux';

import Pipeline from '../node-pipeline/node-pipeline';
import { namespaceChanged } from '../../modules/namespace';
import {
  newPipeline
} from '../../modules';

import styles from './aggregations.less';

/**
 * The core aggregations component.
 */
class Aggregations extends Component {
  static displayName = 'AggregationsComponent';

  /**
   * Render Aggregations component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className={styles.aggregations}>
        <Pipeline {...this.props} />
      </div>
    );
  }
}

/**
 * Map the store state to properties to pass to the components.
 *
 * @param {Object} state - The store state.
 *
 * @returns {Object} The mapped properties.
 */
const mapStateToProps = (state) => ({
  allowWrites: state.allowWrites,
  namespace: state.namespace,
  env: state.env,
  serverVersion: state.serverVersion,
  isAtlasDeployed: state.isAtlasDeployed
});

/**
 * Connect the redux store to the component.
 * (dispatch)
 */
const MappedAggregations = connect(
  mapStateToProps,
  {
    namespaceChanged,
    newPipeline
  }
)(Aggregations);

export default MappedAggregations;
export { Aggregations };
