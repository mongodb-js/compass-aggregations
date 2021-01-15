import React, { PureComponent } from 'react';

import styles from './resize-handle.less';

export default class ResizeHandle extends PureComponent {
  render() {
    return (
      <div
        className={styles['resize-handle']}
        // onClick={(e) => {
        //   e.stopPropagation();
        // }}
        // draggable={false}
        // onDragStart={(e) => {
        //   e.stopPropagation();
        // }}
        // draggable
        // onDragStart={e => {
        //   console.log('on drag start');
        // }}
        // onResizeStart={e => {
        //   console.log('on resize start');
        //   window.isResizingStage = true;
        //   // e.stopPropagation();
        // }}
        // onResizeStop={() => {
        //   console.log('on resize stop');
        //   window.isResizingStage = false;
        // }}
      />
    );
  }
}
