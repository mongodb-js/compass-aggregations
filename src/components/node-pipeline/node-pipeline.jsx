import React, { Component, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ContextMenu from './context-menu/context-menu';
import { BasicStageNode, DataSourceNode } from './node';
import Viewport from './viewport';

import styles from './node-pipeline.less';

const defaultCanvasSize = 500;

const MOUSE_CURSORS = {
  CROSSHAIR: 'crosshair',
  DEFAULT: 'default',
  GRAB: 'grab',
  GRABBING: 'grabbing'
};

class NodePipeline extends Component {
  state = {
    canvasWidth: defaultCanvasSize,
    canvasHeight: defaultCanvasSize,

    // Helpful for adding a loader while we calculate canvas size for
    // first full size render.
    hasRenderedCanvas: false,

    showContextMenu: false,
    contextMenuX: 0,
    contextMenuY: 0
  }

  canvasOffsetX = 0;
  canvasOffsetY = 0;
  canvasContainerRef = null;
  canvasRef = null;
  currentCursorStyle = null;
  // didClick = false;
  mounted = false;
  mouseDown = false;
  mouseX = 0;
  mouseY = 0;
  mouseDragStartX = 0;
  mouseDragStartY = 0;
  mouseTargetId = null;
  mouseFocus = null;
  nodes = { };
  viewport = new Viewport();

  componentDidMount() {
    this.mounted = true;

    // window.onscroll=function(e){ reOffset(); }
    // window.onresize=function(e){ reOffset(); }

    window.addEventListener('resize', this.calculateWindowOffset);
    window.addEventListener('scroll', this.calculateWindowOffset);
    this.calculateWindowOffset();

    // this.canvasRef.
    console.log('this.canvasRef', this.canvasRef);

    const ctx = this.canvasRef.getContext('2d');
    console.log('ctx', ctx);

    const id = uuidv4();
    this.nodes[id] = new DataSourceNode({
      ctx,
      id,
      x: 100,
      y: 100,
      title: 'Data Source'
    });
    const id2 = uuidv4();
    this.nodes[id2] = new BasicStageNode({
      ctx,
      id: id2,
      x: 450,
      y: 100,
      title: '$match'
    });

    requestAnimationFrame(this.renderCanvas);
  }

  componentWillUnmount() {
    this.mounted = false;

    window.removeEventListener('resize', this.calculateWindowOffset);
    window.removeEventListener('scroll', this.calculateWindowOffset);
  }

  calculateWindowOffset = () => {
    const canvasContainerBoundingBox = this.canvasContainerRef.getBoundingClientRect();

    this.canvasOffsetX = canvasContainerBoundingBox.left;
    this.canvasOffsetY = canvasContainerBoundingBox.top;

    const canvasWidth = canvasContainerBoundingBox.width || defaultCanvasSize;
    const canvasHeight = canvasContainerBoundingBox.height || defaultCanvasSize;

    this.setState({
      canvasWidth,
      canvasHeight
    });

    const ctx = this.canvasRef.getContext('2d');
    ctx.width = canvasWidth;
    ctx.height = canvasHeight;
    console.log('calculateWindowOffset', canvasWidth, canvasHeight);

    // TODO: Calc sizes with bounds on nodes/elements.
    this.viewport.width = Math.max(this.viewport.width, canvasWidth);
    this.viewport.height = Math.max(this.viewport.height, canvasHeight);
  }
  // onCanvasClick = () => {
  //   console.log('on click');
  //   this.didClick = true;
  // }

  onCanvasMouseMove = (mouseEvent) => {
    mouseEvent.preventDefault();

    const mouseX = mouseEvent.clientX - this.canvasOffsetX;
    const mouseY = mouseEvent.clientY - this.canvasOffsetY;

    const dx = mouseX - this.mouseDragStartX;
    const dy = mouseY - this.mouseDragStartY;

    this.mouseX = mouseX;
    this.mouseY = mouseY;
    if (!this.mouseDown) {
      const hasTarget = !!this.findMouseTarget(
        mouseX - this.viewport.panningX,
        mouseY - this.viewport.panningY
      );

      if (hasTarget && this.currentCursorStyle !== MOUSE_CURSORS.CROSSHAIR) {
        this.canvasRef.style.cursor = MOUSE_CURSORS.CROSSHAIR;
        this.currentCursorStyle = MOUSE_CURSORS.CROSSHAIR;
      } else if (!hasTarget && this.currentCursorStyle !== MOUSE_CURSORS.GRAB) {
        this.canvasRef.style.cursor = MOUSE_CURSORS.GRAB;
        this.currentCursorStyle = MOUSE_CURSORS.GRAB;
      }
      return;
    }
    // console.log('mouse move:', mouseEvent);

    if (this.currentCursorStyle !== MOUSE_CURSORS.GRABBING) {
      this.canvasRef.style.cursor = MOUSE_CURSORS.GRABBING;
      this.currentCursorStyle = MOUSE_CURSORS.GRABBING;
    }

    this.mouseDragStartX = mouseX;
    this.mouseDragStartY = mouseY;

    if (this.mouseTargetId) {
      // TODO: Find what kind of id it is and handle it seperately.
      // Nodes, connectors, groups etc.
      this.nodes[this.mouseTargetId].dragNode(dx, dy);
      return;
    }

    this.viewport.dragViewport(dx, dy);
  }

  onCanvasMouseDown = (mouseEvent) => {
    mouseEvent.preventDefault();

    console.log('mouse down');

    const mouseX = mouseEvent.clientX - this.canvasOffsetX;
    const mouseY = mouseEvent.clientY - this.canvasOffsetY;

    if (mouseEvent.button === 2) {
      // Right click.
      // TODO: Show different context menus based on mouse target.
      this.setState({
        showContextMenu: true,
        contextMenuX: mouseX,
        contextMenuY: mouseY
      });
      return;
    }

    if (this.state.showContextMenu) {
      this.setState({
        showContextMenu: false
      });
    }

    this.mouseDown = true;

    this.mouseDragStartX = mouseX;
    this.mouseDragStartY = mouseY;

    const mouseTarget = this.findMouseTarget(
      mouseX - this.viewport.panningX,
      mouseY - this.viewport.panningY
    );
    if (mouseTarget) {
      this.mouseTargetId = mouseTarget.id;
    }
  }
  endMouseAction = () => {
    if (this.currentCursorStyle !== MOUSE_CURSORS.GRAB) {
      this.canvasRef.style.cursor = MOUSE_CURSORS.GRAB;
      this.currentCursorStyle = MOUSE_CURSORS.GRAB;
    }
    this.mouseDown = false;
    this.mouseTargetId = null;
  }

  onCanvasMouseUp = (mouseEvent) => {
    mouseEvent.preventDefault();

    this.endMouseAction();

    console.log('mouse up');
  }
  onCanvasMouseOut = (mouseEvent) => {
    mouseEvent.preventDefault();

    this.endMouseAction();
    console.log('mouse out');
  }

  findMouseTarget = (x, y) => {
    for (const node of Object.values(this.nodes)) {
      if (node.containsPoint(x, y)) {
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

    ctx.save();
    this.viewport.renderOffset({ ctx });

    const mouseX = this.mouseX - this.viewport.panningX;
    const mouseY = this.mouseY - this.viewport.panningY;

    for (const node of Object.values(this.nodes)) {
      node.render({
        ctx,
        // mouseDown: this.mouseDown,
        mouseX,
        mouseY
      });
    }


    ctx.restore();
    if (this.mounted) {
      requestAnimationFrame(this.renderCanvas);
    }
  }

  render() {
    const {
      canvasWidth,
      canvasHeight,
      contextMenuX,
      contextMenuY,
      showContextMenu
    } = this.state;

    return (
      <Fragment>
        <div
          className={styles['node-pipeline']}
          // onClick={this.onCanvasClick}
          onMouseDown={this.onCanvasMouseDown}
          onMouseUp={this.onCanvasMouseUp}
          onDragStart={this.onCanvasDragStart}
          onMouseMove={this.onCanvasMouseMove}
          onMouseOut={this.onCanvasMouseOut}
          ref={ref => {
            this.canvasContainerRef = ref;
          }}
        >
          <canvas
            // className={styles['node-pipeline-canvas']}
            ref={ref => {
              this.canvasRef = ref;
            }}
            // width="100%"
            // height="100%"
            width={canvasWidth}
            height={canvasHeight}
          />
        </div>
        {showContextMenu && (
          <ContextMenu
            contextMenuX={contextMenuX}
            contextMenuY={contextMenuY}
          />
        )}
      </Fragment>
    );
  }
}

export default NodePipeline;
