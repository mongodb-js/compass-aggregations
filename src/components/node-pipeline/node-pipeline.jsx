import React, { Component, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ContextMenu from './context-menu/context-menu';
import { BasicStageNode, DataSourceNode } from './node';
import Viewport from './viewport';

import styles from './node-pipeline.less';
import { MOUSE_TARGET_TYPES } from './mouse-target-types';
import Connector from './connector';
import { SOCKET_TYPES } from './socket';
// import { SOCKET_TYPES } from './socket';

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
  mouseDragOriginalStartX = 0;
  mouseDragOriginalStartY = 0;

  mouseTarget = {
    type: null, // MOUSE_TARGET_TYPES
    id: null
  };
  mouseFocus = null;
  nodes = { };
  connectors = { };
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

  createConnectingConnector = () => {
    const id = uuidv4();
    const mouseTarget = this.mouseTarget;

    let start;
    let end;
    if (this.nodes[mouseTarget.nodeId].sockets[mouseTarget.id].type === SOCKET_TYPES.INPUT) {
      start = {
        nodeId: mouseTarget.nodeId,
        socketId: mouseTarget.id
      };
    } else {
      end = {
        nodeId: mouseTarget.nodeId,
        socketId: mouseTarget.id
      };
    }

    this.connectingConnector = new Connector({
      id,
      end,
      start
    });
  };

  // eslint-disable-next-line complexity
  tryToConnectSockets = (
    mouseX,
    mouseY
  ) => {
    const endMouseTarget = this.findMouseTarget(
      mouseX - this.viewport.panningX,
      mouseY - this.viewport.panningY
    );

    if (!endMouseTarget || endMouseTarget.type !== MOUSE_TARGET_TYPES.SOCKET) {
      // No socket trying to connect to.
      console.log('No target to connect to.');
      return;
    }

    if ((
      !this.connectingConnector.start
      || !this.nodes[this.connectingConnector.start.nodeId]
      || !this.nodes[this.connectingConnector.start.nodeId].sockets[this.connectingConnector.start.socketId]
    ) && (
      !this.connectingConnector.end
      || !this.nodes[this.connectingConnector.end.nodeId]
      || !this.nodes[this.connectingConnector.end.nodeId].sockets[this.connectingConnector.end.socketId]
    )) {
      // Socket where started the dragging from no longer exists.
      console.log('Not connecting, socket no longer exists.');
      return;
    }

    const startNode = this.nodes[
      this.connectingConnector.start
        ? this.connectingConnector.start.nodeId
        : this.connectingConnector.end.nodeId
    ];
    const startSocket = startNode.sockets[
      this.connectingConnector.start
        ? this.connectingConnector.start.socketId
        : this.connectingConnector.end.socketId
    ];

    const endNode = this.nodes[endMouseTarget.nodeId];
    const endSocket = endNode.sockets[endMouseTarget.id];

    if (!endSocket.canConnectToSocket(startSocket)) {
      return;
    }

    // If input is already connected we disconnect.
    // TODO: Maybe we will allow multiple connections.
    if (startSocket.isConnected) {
      const connectedConnectorId = startSocket.connectedConnectorId;
      startSocket.connectedConnectorId = null;
      startSocket.isConnected = false;

      delete this.connectors[connectedConnectorId];
    }

    // If output is already connected we disconnect.
    // TODO: Maybe we will allow multiple connections.
    if (endSocket.isConnected) {
      const connectedConnectorId = endSocket.connectedConnectorId;
      endSocket.connectedConnectorId = null;
      endSocket.isConnected = false;

      delete this.connectors[connectedConnectorId];
    }

    let start;
    let end;
    if (startSocket.type === SOCKET_TYPES.INPUT) {
      start = {
        socketId: startSocket.id,
        nodeId: startNode.id
      };
      end = {
        socketId: endSocket.id,
        nodeId: endNode.id
      };
    } else {
      start = {
        socketId: endSocket.id,
        nodeId: endNode.id
      };
      end = {
        socketId: startSocket.id,
        nodeId: startNode.id
      };
    }

    const id = uuidv4();
    this.connectors[id] = new Connector({
      id,
      start,
      end
    });

    endSocket.isConnected = true;
    endSocket.connectedConnectorId = id;
    startSocket.isConnected = true;
    startSocket.connectedConnectorId = id;
  }

  addNodeClicked = (nodeType) => {
    const {
      contextMenuX,
      contextMenuY
    } = this.state;

    const id = uuidv4();
    const ctx = this.canvasRef.getContext('2d');
    if (nodeType === 'data-source') {
      this.nodes[id] = new DataSourceNode({
        ctx,
        id,
        // title: '$match',
        x: contextMenuX,
        y: contextMenuY
      });
    } else {
      this.nodes[id] = new BasicStageNode({
        ctx,
        id,
        title: nodeType,
        // title: 'Da',
        x: contextMenuX,
        y: contextMenuY
      });
    }

    this.setState({
      showContextMenu: false
    });
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

    if (this.mouseTarget) {
      if (
        this.mouseTarget.type === MOUSE_TARGET_TYPES.NODE
        && this.nodes[this.mouseTarget.id]
      ) {
        this.nodes[this.mouseTarget.id].dragNode(dx, dy);
      }
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

    this.mouseTarget = this.findMouseTarget(
      mouseX - this.viewport.panningX,
      mouseY - this.viewport.panningY
    );

    if (this.mouseTarget && this.mouseTarget.type === MOUSE_TARGET_TYPES.SOCKET) {
      this.createConnectingConnector(this.mouseTarget);
    }
  }
  endMouseAction = (mouseEvent) => {
    if (this.currentCursorStyle !== MOUSE_CURSORS.GRAB) {
      this.canvasRef.style.cursor = MOUSE_CURSORS.GRAB;
      this.currentCursorStyle = MOUSE_CURSORS.GRAB;
    }
    if (this.connectingConnector) {
      // TODO: See if we're in a place to connect.
      if (this.mouseTarget && this.mouseTarget.type === MOUSE_TARGET_TYPES.SOCKET) {
        const mouseX = mouseEvent.clientX - this.canvasOffsetX;
        const mouseY = mouseEvent.clientY - this.canvasOffsetY;

        this.tryToConnectSockets(
          mouseX,
          mouseY
        );
      }
      this.connectingConnector = null;
    }
    this.mouseDown = false;
    this.mouseTarget = null;
  }

  onCanvasMouseUp = (mouseEvent) => {
    mouseEvent.preventDefault();

    this.endMouseAction(mouseEvent);

    console.log('mouse up');
  }
  onCanvasMouseOut = (mouseEvent) => {
    mouseEvent.preventDefault();

    this.endMouseAction(mouseEvent);
    console.log('mouse out');
  }

  findMouseTarget = (x, y) => {
    for (const node of Object.values(this.nodes)) {
      // First check the sockets.
      const socket = node.socketsContainPoint(x, y);
      if (socket) {
        return {
          nodeId: node.id,
          id: socket.id,
          socketType: socket.type,
          type: MOUSE_TARGET_TYPES.SOCKET
        };
      }

      // TODO: We'll have to think about z indexes.

      if (node.containsPoint(x, y)) {
        return {
          id: node.id,
          type: MOUSE_TARGET_TYPES.NODE
        };
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
      let connectingNode;
      if (this.connectingConnector && this.connectingConnector.start) {
        connectingNode = this.nodes[this.connectingConnector.start.nodeId];
      } else if (this.connectingConnector && this.connectingConnector.end) {
        connectingNode = this.nodes[this.connectingConnector.end.nodeId];
      }
      node.render({
        ctx,
        // mouseDown: this.mouseDown,
        mouseX,
        mouseY,
        mouseTarget: this.mouseTarget,
        connectingNode
      });
    }

    for (const connector of Object.values(this.connectors)) {
      connector.render({
        ctx,
        // mouseDown: this.mouseDown,
        mouseX,
        mouseY,
        mouseTarget: this.mouseTarget,
        nodes: this.nodes
      });
    }

    if (this.connectingConnector) {
      this.connectingConnector.render({
        ctx,
        // mouseDown: this.mouseDown,
        mouseX,
        mouseY,
        mouseTarget: this.mouseTarget,
        nodes: this.nodes
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
            addNodeClicked={this.addNodeClicked}
            contextMenuX={contextMenuX}
            contextMenuY={contextMenuY}
            mouseTarget={this.mouseTarget}
          />
        )}
      </Fragment>
    );
  }
}

export default NodePipeline;
