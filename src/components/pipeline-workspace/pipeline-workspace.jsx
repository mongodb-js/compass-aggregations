import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Stage from 'components/stage';
import Input from 'components/input';

import styles from './pipeline-workspace.less';

/**
 * The pipeline workspace component.
 */
@DragDropContext(HTML5Backend)
class PipelineWorkspace extends PureComponent {
  static displayName = 'PipelineWorkspace';

  static propTypes = {
    pipeline: PropTypes.array.isRequired
  }

  /**
   * Renders the pipeline workspace.
   *
   * @returns {React.Component} The component.
   */
  render() {
    const pipeline = this.props.pipeline.map((stage, i) => {
      return (<Stage {...this.props} stage={stage} index={i} key={stage.id} />);
    });
    return (
      <div className={classnames(styles['pipeline-workspace'])}>
        <Input {...this.props} />
        {pipeline}
      </div>
    );
  }
}

export default PipelineWorkspace;
