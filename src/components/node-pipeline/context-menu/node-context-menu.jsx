import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './context-menu.less';

class NodeContextMenu extends Component {
  static propTypes = {
    // mouseTarget: PropTypes.object,
    removeNodeClicked: PropTypes.func,
    nodeId: PropTypes.string,
    duplicateNodeClicked: PropTypes.func
  };

  onDuplicateNodeClicked = (e) => {
    e.preventDefault();

    this.props.duplicateNodeClicked(this.props.nodeId);
  }

  onRemoveNodeClicked = (e) => {
    e.preventDefault();

    this.props.removeNodeClicked(this.props.nodeId);
  }

  render() {
    // const {
    //   duplicateNodeClicked,
    //   nodeId,
    //   removeNodeClicked
    // } = this.props;

    return (
      <div>
        <ul
          className={styles['context-menu-options']}
        >
          <li>
            <a
              onClick={this.onDuplicateNodeClicked}
              href="#"
            >Duplicate</a>
          </li>
          <li>
            <a
              onClick={this.onRemoveNodeClicked}
              href="#"
            >Remove</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default NodeContextMenu;
