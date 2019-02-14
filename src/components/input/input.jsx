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
    documents: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    openLink: PropTypes.func.isRequired,
    count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    isOverviewOn: PropTypes.bool.isRequired,
    toggleOverview: PropTypes.func.isRequired
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
        isOverviewOn={this.props.isOverviewOn}
        toggleOverview={this.props.toggleOverview}
      />
    ) : null;
    return (
      <div className={classnames(styles.input)}>
        <InputToolbar
          toggleInputDocumentsCollapsed={
            this.props.toggleInputDocumentsCollapsed
          }
          refreshInputDocuments={this.props.refreshInputDocuments}
          isExpanded={this.props.isExpanded}
          count={this.props.count}
          isOverviewOn={this.props.isOverviewOn}
          toggleOverview={this.props.toggleOverview}
        />
        {workspace}
      </div>
    );
  }
}

export default Input;
