import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Tooltip } from 'hadron-react-components';

import styles from './delete-stage.less';

/**
 * The delete stage button.
 */
class DeleteStage extends PureComponent {
  static displayName = 'DeleteStageComponent';

  static propTypes = {
    index: PropTypes.number.isRequired,
    stageDeleted: PropTypes.func.isRequired,
    setIsModified: PropTypes.func.isRequired
  };

  /**
   * Handle stage deleted clicks.
   */
  onStageDeleted = () => {
    this.props.stageDeleted(this.props.index);
    this.props.setIsModified(true);
  };

  /**
   * Render the button component.
   *
   * @returns {Component} The component.
   */
  render() {
    return (
      <div className={classnames(styles['delete-stage'])}>
        <span data-tip="Delete stage" data-place="top">
          <button
            type="button"
            title="Delete stage"
            className="btn btn-default btn-xs"
            onClick={this.onStageDeleted}>
            <i className="fa fa-trash-o" aria-hidden />
          </button>
        </span>
        <Tooltip />
      </div>
    );
  }
}

export default DeleteStage;
