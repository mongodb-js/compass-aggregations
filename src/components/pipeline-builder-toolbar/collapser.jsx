import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './collapser.less';

/**
 * Collapse text.
 */
const COLLAPSE = 'Collapse all stages';

/**
 * Expand text.
 */
const EXPAND = 'Expand all stages';

/**
 * Angle right class.
 */
const ANGLE_RIGHT = 'fa fa-angle-right';

/**
 * Angle down class.
 */
const ANGLE_DOWN = 'fa fa-angle-down';

/**
 * Collapse/Expand all pipeline stages.
 */
class Collapser extends PureComponent {
  static displayName = 'CollapserComponent';

  static propTypes = {
    isCollapsed: PropTypes.bool.isRequired,
    collapseToggled: PropTypes.func.isRequired,
    expandAllStages: PropTypes.func.isRequired,
    collapseAllStages: PropTypes.func.isRequired
  };

  /**
   * Called when the collapse icon is toggled.
   */
  handleExpandCollapseAllStages = () => {
    if (this.props.isCollapsed === true) {
      this.props.expandAllStages();
    } else {
      this.props.collapseAllStages();
    }
    this.props.collapseToggled();
  };

  /**
   * Render the collapser component.
   *
   * @returns {Component} The component.
   */
  render() {
    const iconClassName = this.props.isCollapsed ? ANGLE_RIGHT : ANGLE_DOWN;
    const buttonTitle = this.props.isCollapsed ? EXPAND : COLLAPSE;

    return (
      <div className={classnames(styles.collapser)}>
        <button
          type="button"
          title={buttonTitle}
          onClick={this.handleExpandCollapseAllStages}
          className="btn btn-default btn-xs">
          <i className={iconClassName} aria-hidden />
        </button>
      </div>
    );
  }
}

export default Collapser;
