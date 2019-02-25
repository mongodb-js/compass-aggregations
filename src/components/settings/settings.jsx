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
      <div className={classnames(styles.settings)}>
        <div className={classnames(styles['settings-header'])}>
          <div id="settings-header-title">Settings</div>
          <IconButton
            title="Close Settings"
            className="btn btn-xs btn-default"
            iconClassName="fa fa-times"
            clickHandler={this.props.toggleSettingsIsExpanded}
          />
        </div>
        <div className={classnames(styles['settings-body'])}>
          <form>
            <div>
              <label>Comment Mode</label>
              <input type="checkbox" />
            </div>
            <div>
              <label>MaxTimeoutMS</label>
              <input type="number" value="5000" />
            </div>
            <div>
              <label>Sample Size</label>
              <input type="number" value="100" />
            </div>
            <div>
              <label>Limit</label>
              <input type="number" value="100" />
            </div>
          </form>
        </div>
        <div className={styles['settings-footer']}>
          <TextButton
            id="cancel-settings"
            className="btn btn-default btn-sm"
            text="Cancel"
            clickHandler={this.onCancelClicked.bind(this)}
          />
          <TextButton
            id="apply-settings"
            className="btn btn-primary btn-sm"
            text="Apply"
            clickHandler={this.onApplyClicked.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Settings;
