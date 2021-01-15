import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import StageEditor from 'components/stage-editor';
import StagePreview from 'components/stage-preview';
import { Resizable } from 're-resizable';

// import ResizeHandle from '../resize-handle/resize-handle';

import styles from './stage-workspace.less';

const resizeableDirections = {
  top: false,
  right: true,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false
};

/**
 * The stage workspace component.
 */
class StageWorkspace extends PureComponent {
  static displayName = 'StageWorkspace';

  static propTypes = {
    stage: PropTypes.string.isRequired,
    stageOperator: PropTypes.string,
    snippet: PropTypes.string,
    error: PropTypes.string,
    syntaxError: PropTypes.string,
    isValid: PropTypes.bool.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isComplete: PropTypes.bool.isRequired,
    runStage: PropTypes.func.isRequired,
    runOutStage: PropTypes.func.isRequired,
    gotoOutResults: PropTypes.func.isRequired,
    gotoMergeResults: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    serverVersion: PropTypes.string.isRequired,
    isAutoPreviewing: PropTypes.bool.isRequired,
    fromStageOperators: PropTypes.bool.isRequired,
    fields: PropTypes.array.isRequired,
    previewDocuments: PropTypes.array.isRequired,
    setIsModified: PropTypes.func.isRequired,
    stageChanged: PropTypes.func.isRequired,
    projections: PropTypes.array.isRequired,
    projectionsChanged: PropTypes.func.isRequired,
    newPipelineFromPaste: PropTypes.func.isRequired
  };

  /**
   * Renders the stage workspace.
   *
   * @returns {React.Component} The component.
   */
  render() {
    return (
      <div className={classnames(styles['stage-workspace'])}>
        <Resizable
          className={styles['compass-shell']}
          defaultSize={{
            width: '350px',
            height: 'auto'
          }}
          id="content"
          // minHeight={defaultShellHeightClosed}
          // maxHeight={800}
          onResizeStart={e => {
            console.log('on resize start');
            window.isResizingStage = true;
            // e.stopPropagation();
          }}
          onResizeStop={() => {
            console.log('on resize stop');
            window.isResizingStage = false;
          }}
          minWidth="8%"
          maxWidth="92%"
          enable={resizeableDirections}
          ref={c => { this.resizableRef = c; }}
          // handleComponent={{
          //   right: <ResizeHandle />,
          // }}
        >
          <StageEditor
            stage={this.props.stage}
            stageOperator={this.props.stageOperator}
            snippet={this.props.snippet}
            error={this.props.error}
            syntaxError={this.props.syntaxError}
            isValid={this.props.isValid}
            fromStageOperators={this.props.fromStageOperators}
            runStage={this.props.runStage}
            index={this.props.index}
            serverVersion={this.props.serverVersion}
            setIsModified={this.props.setIsModified}
            isAutoPreviewing={this.props.isAutoPreviewing}
            fields={this.props.fields}
            stageChanged={this.props.stageChanged}
            projections={this.props.projections}
            projectionsChanged={this.props.projectionsChanged}
            newPipelineFromPaste={this.props.newPipelineFromPaste}
          />
        </Resizable>
        <StagePreview
          documents={this.props.previewDocuments}
          isValid={this.props.isValid}
          isEnabled={this.props.isEnabled}
          isLoading={this.props.isLoading}
          isComplete={this.props.isComplete}
          error={this.props.error}
          stageOperator={this.props.stageOperator}
          stage={this.props.stage}
          index={this.props.index}
          runOutStage={this.props.runOutStage}
          gotoOutResults={this.props.gotoOutResults}
          gotoMergeResults={this.props.gotoMergeResults}
        />
      </div>
    );
  }
}

export default StageWorkspace;
