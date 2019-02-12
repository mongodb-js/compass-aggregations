import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import InputBuilderToolbar from 'components/input-builder-toolbar';
import InputPreviewToolbar from 'components/input-preview-toolbar';

import styles from './input-toolbar.less';

/**
 * The input toolbar component.
 */
class InputToolbar extends PureComponent {
  static displayName = 'InputToolbarComponent';

  static propTypes = {
    toggleInputDocumentsCollapsed: PropTypes.func.isRequired,
    refreshInputDocuments: PropTypes.func.isRequired,
    collapseToggled: PropTypes.func.isRequired,
    expandAllStages: PropTypes.func.isRequired,
    collapseAllStages: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
  };

  /**
   * Renders the input toolbar.
   *
   * @returns {React.Component} The component.
   */
  render() {
    return (
      <div className={classnames(styles['input-toolbar'])}>
        <InputBuilderToolbar
          toggleInputDocumentsCollapsed={
            this.props.toggleInputDocumentsCollapsed
          }
          collapseToggled={this.props.collapseToggled}
          expandAllStages={this.props.expandAllStages}
          collapseAllStages={this.props.collapseAllStages}
          refreshInputDocuments={this.props.refreshInputDocuments}
          isExpanded={this.props.isExpanded}
          isCollapsed={this.props.isCollapsed}
          count={this.props.count}
        />
        <InputPreviewToolbar />
      </div>
    );
  }
}

export default InputToolbar;
