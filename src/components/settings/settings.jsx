import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './settings.less';

class Settings extends PureComponent {
  static displayName = 'Settings';
  static propTypes = {
    settings: PropTypes.bool.isRequired,
    saveSettings: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired
  }

  render() {
    return (
      <div className={classnames(styles.settings)}>
        <h1>Settings</h1>
        <ul>
          <li><label>Sample Mode</label><input type="checkbox" /></li>
          <li><label>MaxTimeoutMS</label><input type="number" value="5000" /></li>
          <li><label>Sample Size</label><input type="number" value="100" /></li>
        </ul>
        <button className="btn btn-default" onClick={this.cancel}>Cancel</button>
        <button className="btn btn-primary" onClick={this.apply}>Apply</button>
      </div>
    );
  }
}

export default StageToolbar;
