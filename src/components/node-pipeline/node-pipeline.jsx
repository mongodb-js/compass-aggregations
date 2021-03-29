import React, { Component } from 'react';

import Node from './node';

class NodePipeline extends Component {
  state = {
    canvasWidth: 500,
    canvasHeight: 500
  }

  componentDidMount() {
    const {
      canvasWidth,
      canvasHeight
    } = this.state;

    // this.canvasRef.
    console.log('this.canvasRef', this.canvasRef);
    const ctx = this.canvasRef.getContext('2d');

    const baseNode = new Node({
      ctx,
      x: canvasWidth * (1 / 5),
      y: canvasHeight * (1 / 5),
      title: 'Data Source'
    });

    baseNode.render(ctx);
  }

  canvasRef = null;

  render() {
    const {
      canvasWidth,
      canvasHeight
    } = this.state;

    return (
      <div>
        <div>
          Pipeline
        </div>
        <div>
          <canvas
            ref={ref => {
              this.canvasRef = ref;
            }}
            width={canvasWidth}
            height={canvasHeight}
          />
        </div>
      </div>
    );
  }
}

export default NodePipeline;
