import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './overview-toggler.less';

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
class OverviewToggler extends PureComponent {
  static displayName = 'OverviewToggler';

  static propTypes = {
    overview: PropTypes.object.isRequired,
    overviewToggled: PropTypes.func.isRequired
  };

  /**
   * Render the collapser component.
   *
   * @returns {Component} The component.
   */
  render() {
    const isCollapsed = this.props.overview.isOn;

    const iconClassName = isCollapsed ? ANGLE_RIGHT : ANGLE_DOWN;
    const buttonTitle = isCollapsed ? EXPAND : COLLAPSE;

    return (
      <div className={classnames(styles.collapser)}>
        <button
          type="button"
          title={buttonTitle}
          onClick={this.props.overviewToggled}
          className="btn btn-default btn-xs">
          <i className={iconClassName} aria-hidden />
        </button>
      </div>
    );
  }
}

export default OverviewToggler;
