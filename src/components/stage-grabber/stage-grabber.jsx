import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { Tooltip } from 'hadron-react-components';

import styles from './stage-grabber.less';

/**
 * Grab a stage component.
 */
class StageGrabber extends PureComponent {
  static displayName = 'StageGrabberComponent';

  /**
   * Render the stage grabber component.
   *
   * @returns {Component} The component.
   */
  render() {
    return (
      <div
        className={classnames(styles['stage-grabber'])}
        title="Reorder Stage">
        <span
          data-tip="Drag to reorder this stage in the pipeline"
          data-place="top">
          <i className="fa fa-bars" aria-hidden />
        </span>
        <Tooltip />
      </div>
    );
  }
}

export default StageGrabber;
