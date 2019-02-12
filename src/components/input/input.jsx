import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import InputToolbar from 'components/input-toolbar';
import InputWorkspace from 'components/input-workspace';

import styles from './input.less';

class Input extends PureComponent {
  static displayName = 'InputComponent';

  static propTypes = {
    toggleInputDocumentsCollapsed: PropTypes.func.isRequired,
    refreshInputDocuments: PropTypes.func.isRequired,
    collapseToggled: PropTypes.func.isRequired,
    expandAllStages: PropTypes.func.isRequired,
    collapseAllStages: PropTypes.func.isRequired,
    documents: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    openLink: PropTypes.func.isRequired,
    count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    isCollapsed: PropTypes.bool.isRequired
  };

  /**
   * Render the input component.
   *
   * @returns {Component} The component.
   */
  render() {
    const workspace = !this.props.isExpanded ? (
      <InputWorkspace
        documents={this.props.documents}
        openLink={this.props.openLink}
        isLoading={this.props.isLoading}
      />
    ) : null;
    return (
      <div className={classnames(styles.input)}>
        <InputToolbar
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
        {workspace}
      </div>
    );
  }
}

export default Input;
