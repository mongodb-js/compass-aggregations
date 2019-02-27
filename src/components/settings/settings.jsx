import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { TextButton } from 'hadron-react-buttons';
import {
  DEFAULT_MAX_TIME_MS,
  DEFAULT_SAMPLE_SIZE,
  DEFAULT_LARGE_LIMIT
} from '../../constants';

import styles from './settings.less';

class Settings extends PureComponent {
  static displayName = 'Settings';
  static propTypes = {
    isCommenting: PropTypes.bool.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    limit: PropTypes.number.isRequired,
    largeLimit: PropTypes.number.isRequired,
    maxTimeMS: PropTypes.number.isRequired,
    settings: PropTypes.object.isRequired,
    toggleSettingsIsExpanded: PropTypes.func.isRequired,
    toggleSettingsIsCommentMode: PropTypes.func.isRequired,
    setSettingsSampleSize: PropTypes.func.isRequired,
    setSettingsMaxTimeMS: PropTypes.func.isRequired,
    setSettingsLimit: PropTypes.func.isRequired,
    applySettings: PropTypes.func.isRequired,
    runStage: PropTypes.func.isRequired
  };

  onCancelClicked(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.props.toggleSettingsIsExpanded();
  }

  onCommentModeClicked() {
    this.props.toggleSettingsIsCommentMode();
  }

  onSampleSizeChanged(evt) {
    this.props.setSettingsSampleSize(parseInt(evt.currentTarget.value, 10));
  }

  onMaxTimeoutChanged(evt) {
    this.props.setSettingsMaxTimeMS(parseInt(evt.currentTarget.value, 10));
  }

  onLimitChanged(evt) {
    this.props.setSettingsLimit(parseInt(evt.currentTarget.value, 10));
  }

  onApplyClicked(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    // Update the settings in the state.
    this.props.applySettings();

    // Updated settings used to run all stages in the current pipeline.
    this.props.runStage(0);

    // Hide the settings panel.
    this.props.toggleSettingsIsExpanded();
  }
  renderFields() {
    let commentModeChecked = this.props.isCommenting;
    let sampleSize = this.props.limit;
    let maxTimeMS = this.props.maxTimeMS;
    let limit = this.props.largeLimit;

    if (this.props.settings.isDirty) {
      commentModeChecked = this.props.settings.isCommentMode;
      sampleSize = this.props.settings.sampleSize;
      maxTimeMS = this.props.settings.maxTimeMS;
      limit = this.props.settings.limit;
    }

    return (
      <div className={classnames(styles.body)}>
        <div className={classnames(styles['input-group'])}>
          <div className={classnames(styles['input-meta'])}>
            <label>Comment Mode</label>
            <p>
              When enabled, adds helper comments to each stage. Only applies to
              new stages.
            </p>
          </div>
          <div className={classnames(styles['input-control'])}>
            <input
              id="aggregation-comment-mode"
              type="checkbox"
              checked={commentModeChecked}
              onChange={this.onCommentModeClicked.bind(this)}
            />
          </div>
        </div>
        <div className={classnames(styles['input-group'])}>
          <div className={classnames(styles['input-meta'])}>
            <label>Sample Size</label>
            <p>Specify the number of documents to use for Sample Mode.</p>
          </div>
          <div className={classnames(styles['input-control'])}>
            <input
              type="number"
              min="0"
              placeholder={DEFAULT_SAMPLE_SIZE}
              value={sampleSize}
              onChange={this.onSampleSizeChanged.bind(this)}
            />
          </div>
        </div>
        <div className={classnames(styles['input-group'])}>
          <div className={classnames(styles['input-meta'])}>
            <label>Max Time</label>
            <p>
              Specifies a cumulative time limit in seconds for processing
              operations on a cursor. Max timeout prevents long hang times.
            </p>
          </div>
          <div className={classnames(styles['input-control'])}>
            <input
              type="number"
              placeholder={DEFAULT_MAX_TIME_MS}
              min="0"
              step="1000"
              value={maxTimeMS}
              onChange={this.onMaxTimeoutChanged.bind(this)}
            />
          </div>
        </div>
        <div className={classnames(styles['input-group'])}>
          <div className={classnames(styles['input-meta'])}>
            <label>Limit</label>
            <p>
              Limits input documents before $group, $bucket, and $bucketAuto
              stages. Set a limit to make the collection run faster.
            </p>
          </div>
          <div className={classnames(styles['input-control'])}>
            <input
              type="number"
              min="0"
              placeholder={DEFAULT_LARGE_LIMIT}
              value={limit}
              onChange={this.onLimitChanged.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
  render() {
    if (!this.props.isExpanded) {
      return null;
    }

    return (
      <div className={classnames(styles.container)}>
        <div className={classnames(styles.header)}>
          <div className={classnames(styles['header-title'])}>Settings</div>
          <div className={classnames(styles['header-btn-group'])}>
            <TextButton
              id="aggregations-settings-cancel"
              className="btn btn-default btn-xs"
              text="Cancel"
              clickHandler={this.onCancelClicked.bind(this)}
            />

            <TextButton
              id="aggregation-settings-apply"
              className="btn btn-primary btn-xs"
              text="Apply"
              clickHandler={this.onApplyClicked.bind(this)}
            />
          </div>
        </div>
        {this.renderFields()}
      </div>
    );
  }
}

export default Settings;
