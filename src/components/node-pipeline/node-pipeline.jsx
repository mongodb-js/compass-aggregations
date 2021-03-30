import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Node from './node';

class NodePipeline extends Component {
  state = {
    canvasWidth: 500,
    canvasHeight: 500
  }

  componentDidMount() {
    this.mounted = true;

    const {
      canvasWidth,
      canvasHeight
    } = this.state;

    // this.canvasRef.
    console.log('this.canvasRef', this.canvasRef);

    const ctx = this.canvasRef.getContext('2d');
    console.log('ctx', ctx);

    const id = uuidv4();

    this.nodes[id] = new Node({
      ctx,
      id,
      x: canvasWidth * (1 / 5),
      y: canvasHeight * (1 / 5),
      title: 'Data Source'
    });

    requestAnimationFrame(this.renderCanvas);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  // onCanvasDragStart = (dragEvent) => {
  //   console.log('drag start', dragEvent);
  //   this.mouseDragging = true;
  // }
  // onCanvasDrag = (dragEvent) => {

  // }
  // onCanvasDragEnd = (dragEvent) => {
  //   this.mouseDragging = false;
  // }

  // onCanvasClick = () => {
  //   console.log('on click');
  //   this.didClick = true;
  // }

  onCanvasMouseMove = (mouseEvent) => {
    // console.log('mouse move:', mouseEvent);
    const dx = mouseEvent.clientX - this.mouseX;
    const dy = mouseEvent.clientY - this.mouseY;

    this.mouseX = mouseEvent.clientX;
    this.mouseY = mouseEvent.clientY;

    if (this.mouseDragging && this.mouseTargetId) {
      this.nodes[this.mouseTargetId].dragNode(dx, dy);
    }
  }

  onCanvasMouseDown = (mouseEvent) => {
    console.log('mouse down');
    this.mouseDragging = true;

    this.mouseX = mouseEvent.clientX;
    this.mouseY = mouseEvent.clientY;

    const mouseTarget = this.findMouseTarget();
    if (mouseTarget) {
      this.mouseTargetId = mouseTarget.id;
    }
  }
  onCanvasMouseUp = (mouseEvent) => {
    // this.didClick = false;
    this.mouseDragging = false;
    this.mouseTargetId = null;
    console.log('mouse up');
  }

  canvasRef = null;
  // didClick = false;
  mounted = false;
  mouseDragging = false;
  mouseX = 0;
  mouseY = 0;
  mouseTargetId = null;
  mouseFocus = null;
  nodes = { };

  findMouseTarget = () => {
    for (const node of Object.values(this.nodes)) {
      if (node.containsPoint(this.mouseX, this.mouseY)) {
        return node;
      }
    }
  }

  renderCanvas = () => {
    const {
      canvasWidth,
      canvasHeight
    } = this.state;

    const ctx = this.canvasRef.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (const node of Object.values(this.nodes)) {
      node.render({
        ctx,
        mouseDragging: this.mouseDragging,
        mouseX: this.mouseX,
        mouseY: this.mouseY
      });
    }

    if (this.mounted) {
      requestAnimationFrame(this.renderCanvas);
    }
  }

  render() {
    const {
      canvasWidth,
      canvasHeight
    } = this.state;

    return (
      <div>
        {/* <div>
          Pipeline
        </div> */}
        <div>
          <canvas
            ref={ref => {
              this.canvasRef = ref;
            }}
            width={canvasWidth}
            height={canvasHeight}
            onClick={this.onCanvasClick}
            onMouseDown={this.onCanvasMouseDown}
            onMouseUp={this.onCanvasMouseUp}
            onDragStart={this.onCanvasDragStart}
            onMouseMove={this.onCanvasMouseMove}
          />
        </div>
      </div>
    );
  }
}

export default NodePipeline;
