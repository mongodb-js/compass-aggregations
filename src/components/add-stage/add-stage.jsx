import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TextButton } from 'hadron-react-buttons';
import { Tooltip } from 'hadron-react-components';

import styles from './add-stage.less';

/**
 * Display a card with an add stage button.
 */
class AddStage extends PureComponent {
  static displayName = 'AddStageComponent';

  static propTypes = {
    stageAdded: PropTypes.func.isRequired
  };

  /**
   * Render the stage component.
   *
   * @returns {Component} The component.
   */
  render() {
    return (
      <div className={classnames(styles['add-stage'])}>
        <span data-tip="Add New Stage">
          <TextButton
            text="Add Stage"
            className="btn btn-xs btn-primary"
            clickHandler={this.props.stageAdded}
          />
        </span>
        <Tooltip />
      </div>
    );
  }
}

export default AddStage;
