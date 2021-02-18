import classnames from 'classnames';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './splitter.less';

/**
 * Displays the splitter/separator for resizing.
 */
class Splitter extends PureComponent {
  static displayName = 'SplitterComponent';

  static propTypes = {
    isCollationExpanded: PropTypes.bool,
    isEditingView: PropTypes.bool
  };

  static defaultProps = {
    isCollationExpanded: false,
    isEditingView: false
  };

  /**
   * Render global the separator bar.
   *
   * @returns {Component} The component.
   */
  render() {
    return (
      <div
        className={classnames(styles.splitter, {
          [styles['splitter-editing-view']]: this.props.isEditingView,
          [styles['splitter-editing-collation']]: this.props.isCollationExpanded
        })}
      />
    );
  }
}

export default Splitter;
