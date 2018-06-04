import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import decomment from 'decomment';
import { OUT } from 'modules/pipeline';

import styles from './stage-preview-toolbar.less';

/**
 * Zero state text.
 */
const ZERO_STATE = 'A sample of the aggregated results from this stage will be shown below';

/**
 * Disabled text.
 */
const DISABLED = 'Stage is disabled. Results not passed in the pipeline.';

/**
 * The stage preview toolbar component.
 */
class StagePreviewToolbar extends PureComponent {
  static displayName = 'StagePreviewToolbar';
  static propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    stageOperator: PropTypes.string,
    stageValue: PropTypes.any,
    count: PropTypes.number.isRequired
  }

  /**
   * Get the word.
   *
   * @returns {String} The word.
   */
  getWord() {
    return this.props.count === 1 ? 'document' : 'documents';
  }

  /**
   * Get the stage preview text.
   *
   * @returns {String} The text.
   */
  getText() {
    if (this.props.isEnabled) {
      if (this.props.stageOperator) {
        if (this.props.stageOperator === OUT && this.props.isValid) {
          return `Documents will be saved to the collection: ${decomment(this.props.stageValue)}`;
        }
        return `Output after ${this.props.stageOperator} stage (Sample of ${this.props.count} ${this.getWord()})`;
      }
      return ZERO_STATE;
    }
    return DISABLED;
  }

  /**
   * Renders the stage preview toolbar.
   *
   * @returns {React.Component} The component.
   */
  render() {
    return (
      <div className={classnames(styles['stage-preview-toolbar'])}>
        {this.getText()}
      </div>
    );
  }
}

export default StagePreviewToolbar;
