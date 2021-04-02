import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { STAGE_OPERATORS } from 'mongodb-ace-autocompleter';
import { Tooltip } from 'hadron-react-components';

import styles from './context-menu.less';

class ContextMenu extends Component {
  static propTypes = {
    addNodeClicked: PropTypes.func,
    contextMenuX: PropTypes.number,
    contextMenuY: PropTypes.number,
    mouseTarget: PropTypes.object
  };

  state = {
    searchText: ''
  }

  renderContentMenuItem(item) {
    const {
      description,
      name
    } = item;

    const { addNodeClicked } = this.props;

    return (
      <li
        data-tip={description}
        data-place="right"
        data-for={`select-option-${name}`}
        key={`stage-option-${name}`}
      >
        <a
          onClick={() => { addNodeClicked(name); }}
          href="#"
        >{name}</a>

        <Tooltip
          className={styles.tooltip}
          id={`select-option-${name}`}
        />
      </li>
    );
  }

  render() {
    const {
      contextMenuX,
      contextMenuY,
      mouseTarget
    } = this.props;

    const { searchText } = this.state;

    // const operators = STAGE_OPERATORS.filter((o) => {
    //   if ((o.name === OUT || o.name === MERGE) && !this.props.allowWrites) return false;
    //   return semver.gte(this.props.serverVersion, o.version) &&
    //     this.isSupportedEnv(o.env, this.props.env);
    // });

    const operators = STAGE_OPERATORS.filter(
      operator => (
        !searchText
        || `${operator.name}`.includes(`${searchText}`.toLowerCase())
      )
    );

    return (
      <div
        className={styles['context-menu']}
        style={{
          left: contextMenuX,
          top: contextMenuY
        }}
      >
        {!mouseTarget && (
          <Fragment>
            <div>
              <input
                className={styles['context-menu-search-input']}
                type="text"
                onChange={e => { this.setState({ searchText: e.target.value }); }}
                value={searchText}
                placeholder="Search for a stage..."
              />
            </div>
            <ul
              className={styles['context-menu-options']}
            >

              {operators.map(
                operator => this.renderContentMenuItem(operator)
              )}

              {/* <li>
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
            </li> */}
            </ul>
          </Fragment>
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
