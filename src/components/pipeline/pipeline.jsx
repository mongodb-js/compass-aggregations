import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import PipelineToolbar from 'components/pipeline-toolbar';
import PipelineWorkspace from 'components/pipeline-workspace';
import SavePipeline from 'components/save-pipeline';
import SavePipelineModal from 'components/save-pipeline-modal';
import RestorePipelineModal from 'components/restore-pipeline-modal';

import styles from './pipeline.less';

/**
 * Displays a pipeline.
 */
class Pipeline extends PureComponent {
  static displayName = 'PipelineComponent';

  static propTypes = {
    pipeline: PropTypes.array.isRequired,
    serverVersion: PropTypes.string.isRequired,
    stageAdded: PropTypes.func.isRequired,
    stageChanged: PropTypes.func.isRequired,
    stageCollapseToggled: PropTypes.func.isRequired,
    stageDeleted: PropTypes.func.isRequired,
    stageMoved: PropTypes.func.isRequired,
    stageOperatorSelected: PropTypes.func.isRequired,
    stageToggled: PropTypes.func.isRequired,
    savedPipeline: PropTypes.object.isRequired,
    restorePipeline: PropTypes.object.isRequired,
    copyToClipboard: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired
  }

  /**
   * Render the pipeline component.
   *
   * @returns {Component} The component.
   */
  render() {
    const savePipeline = this.props.savedPipeline.isListVisible ? <SavePipeline {...this.props} /> : null;
    const savePipelineModal = this.props.savedPipeline.isModalVisible ? <SavePipelineModal {...this.props} /> : null;
    const restorePipelineModal = this.props.restorePipeline.isModalVisible ? <RestorePipelineModal {...this.props} /> : null;

    return (
      <div className={classnames(styles.pipeline)}>
        <PipelineToolbar {...this.props} />
        <div className={classnames(styles['pipeline-separator'])}></div>
        <PipelineWorkspace {...this.props} />
        { savePipeline }
        { savePipelineModal }
        { restorePipelineModal }
      </div>
    );
  }
}

export default Pipeline;
