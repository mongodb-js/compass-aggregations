import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { STAGE_OPERATORS } from 'mongodb-ace-autocompleter';
// import { Tooltip } from 'hadron-react-components';

import styles from './context-menu.less';

class ContextMenu extends Component {
  static propTypes = {
    children: PropTypes.any,
    contextMenuX: PropTypes.number,
    contextMenuY: PropTypes.number
  };

  state = {
    searchText: ''
  }

  render() {
    const {
      children,
      contextMenuX,
      contextMenuY
    } = this.props;

    return (
      <div
        className={styles['context-menu']}
        style={{
          left: contextMenuX,
          top: contextMenuY
        }}
      >
        {children}
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
// const mapStateToProps = (state) => ({
//   allowWrites: state.allowWrites,
//   namespace: state.namespace,
//   env: state.env,
//   serverVersion: state.serverVersion,
//   isAtlasDeployed: state.isAtlasDeployed
// });

/**
 * Connect the redux store to the component.
 * (dispatch)
 */
// const MappedContextMenu = connect(
//   mapStateToProps,
//   {
//     namespaceChanged,
//     newPipeline
//   }
// )(ContextMenu);

export default ContextMenu;
