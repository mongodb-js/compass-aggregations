import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RestoreButton from 'components/restore-pipeline-button';
import DeleteButton from 'components/delete-pipeline-button';

import styles from './save-pipeline-card.less';

/**
 * saved pipelines card
 */
class SavePipelineCard extends PureComponent {
  static displayName = 'SavePipelineCardComponent';

  static propTypes = {
    restorePipelineModalToggle: PropTypes.func.isRequired,
    restorePipeline: PropTypes.func.isRequired,
    deletePipeline: PropTypes.func.isRequired,
    objectID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }

  handleDelete = () => {
    this.props.deletePipeline(this.props.objectID);
  }

  restoreClickHandler = () => {
    this.props.restorePipeline(this.props.objectID);
    this.props.restorePipelineModalToggle(1);
  }

  /**
   * Render a pipeline card.
   *
   * @returns {Component} The component.
   */
  render() {
    return (
      <div
        className={classnames(styles['save-pipeline-card'])}
        data-pipeline-object-id={this.props.objectID}>
        <div className={classnames(styles['save-pipeline-card-title'])}>
          {this.props.name}
        </div>
        <RestoreButton clickHandler={this.restoreClickHandler} />
        <DeleteButton clickHandler={this.handleDelete} />
      </div>
    );
  }
}

export default SavePipelineCard;
