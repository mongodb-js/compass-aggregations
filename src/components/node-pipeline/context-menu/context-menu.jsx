import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import styles from './context-menu.less';

class ContextMenu extends Component {
  static propTypes = {
    addNodeClicked: PropTypes.func,
    contextMenuX: PropTypes.number,
    contextMenuY: PropTypes.number,
    mouseTarget: PropTypes.object
  };

  render() {
    const {
      addNodeClicked,
      contextMenuX,
      contextMenuY,
      mouseTarget
    } = this.props;

    return (
      <div
        className={styles['context-menu']}
        style={{
          left: contextMenuX,
          top: contextMenuY
        }}
      >
        <div>
          Context Menu
        </div>
        {!mouseTarget && (
          <ul
            className={styles['context-menu-options']}
          >
            <li>
              <a
                onClick={() => { addNodeClicked('data-source'); }}
                href="#"
              >Data Source</a>
            </li>
            <li>
              <a
                onClick={() => { addNodeClicked('$match'); }}
                href="#"
              >$match</a>
            </li>
          </ul>
        )}
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
