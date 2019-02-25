import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { TextButton, IconButton } from 'hadron-react-buttons';

import styles from './settings.less';

class Settings extends PureComponent {
  static displayName = 'Settings';
  static propTypes = {
    isExpanded: PropTypes.bool.isRequired,
    sampleSize: PropTypes.number.isRequired,
    maxTimeoutMS: PropTypes.number.isRequired,

    toggleSettingsIsExpanded: PropTypes.func.isRequired,
    toggleSettingsIsCommentMode: PropTypes.func.isRequired,
    setSettingsSampleSize: PropTypes.func.isRequired,
    setSettingsMaxTimeoutMS: PropTypes.func.isRequired,
    setSettingsLimit: PropTypes.func.isRequired
  };

  onCancelClicked() {
    this.props.toggleSettingsIsExpanded();
  }

  onApplyClicked() {
    this.props.setSettingsSampleSize();
    this.props.setSettingsMaxTimeoutMS();
    this.props.toggleSettingsIsCommentMode();
    this.props.toggleSettingsIsExpanded();
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
              id="settings-cancel"
              className="btn btn-default btn-xs"
              text="Cancel"
              clickHandler={this.onCancelClicked.bind(this)}
            />

            <TextButton
              id="settings-apply"
              className="btn btn-primary btn-xs"
              text="Apply"
              clickHandler={this.onApplyClicked.bind(this)}
            />
          </div>
        </div>
        <div className={classnames(styles.body)}>
          <div className={classnames(styles['input-group'])}>
            <div className={classnames(styles['input-meta'])}>
              <label>Comment Mode</label>
              <p>
                When enabled, adds helper comments to each stage. Only applies
                to new stages.
              </p>
            </div>
            <div className={classnames(styles['input-control'])}>
              <input id="aggregation-comment-mode" type="checkbox" />
            </div>
          </div>
          <div className={classnames(styles['input-group'])}>
            <div className={classnames(styles['input-meta'])}>
              <label>Sample Size</label>
              <p>Specify the number of documents to use for Sample Mode.</p>
            </div>
            <div className={classnames(styles['input-control'])}>
              <input type="number" placeholder="100" />
            </div>
          </div>
          <div className={classnames(styles['input-group'])}>
            <div className={classnames(styles['input-meta'])}>
              <label>Max Timeout</label>
              <p>
                Specifies a cumulative time limit in seconds for processing
                operations on a cursor. Max timeout prevents long hang times.
              </p>
            </div>
            <div className={classnames(styles['input-control'])}>
              <input type="number" placeholder="5000" step="1000" />
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
              <input type="number" placeholder="100" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
