import { v4 as uuidv4 } from 'uuid';
import { MOUSE_TARGET_TYPES } from './mouse-target-types';

import Socket, { SOCKET_TYPES } from './socket';

const defaultBackground = 'rgba(240, 240, 240, 0.5)';
const defaultHoverBorder = 'purple';
const defaultBorder = 'black';
const textStyle = 'black';
const padding = 25;
const minWidth = 100;

export const NODE_TYPES = {
  BASIC_STAGE: 'BASIC_STAGE',
  DATA_SOURCE: 'DATA_SOURCE',
  VARIABLE: 'VARIABLE'
};

export default class Node {
  constructor({
    ctx,
    id,
    title,
    x,
    y,
    background = defaultBackground,
    border = defaultBorder,
    type = NODE_TYPES.BASIC_STAGE
    // sockets = {},
    // socketInputs = 0,
    // socketOutputs = 0
  }) {
    this.title = title;
    this.x = x;
    this.y = y;
    this.type = type;
    this.id = id;

    this.background = background;
    this.border = border;

    const textWidth = title ? ctx.measureText(title).width : 0;
    this.width = Math.max(textWidth + (padding * 2), minWidth);
    this.height = 100 + (padding * 2);

    // TODO: Parse and rebuild.
    // this.sockets = sockets;
    this.sockets = {};

    // Count for rendering.
    // this.socketInputs = socketInputs;
    // this.socketOutputs = socketOutputs;

    // this.calculateSocketLocations();
  }

  dragNode(dx, dy) {
    this.x += dx;
    this.y += dy;

    for (const socket of Object.values(this.sockets)) {
      socket.moveSocket(dx, dy);
    }
  }

  addSocket(socketProps) {
    const socketId = uuidv4();
    this.sockets[socketId] = new Socket({
      id: socketId,
      x: this.x + this.width,
      y: this.y + (this.height / 2),
      type: SOCKET_TYPES.OUTPUT,
      ...socketProps
    });

    // TODO: We could add this.calculateSocketLocations(); here.

    return socketId;
  }

  disconnectSocket(socketId) {
    this.sockets[socketId].disconnect();
  }

  calculateSocketLocations() {
    let totalOutputs = 0;
    let totalInputs = 0;

    for (const socket of Object.values(this.sockets)) {
      if (socket.attachedFieldId) {
        continue;
      } else if (socket.type === SOCKET_TYPES.INPUT) {
        totalInputs++;
      } else if (socket.type === SOCKET_TYPES.OUTPUT) {
        totalOutputs++;
      }
    }

    let outputsCalculated = 0;
    let inputsCalculated = 0;
    for (const socket of Object.values(this.sockets)) {
      if (socket.attachedFieldId) {
        // TODO: Find field pos.
        socket.x = this.x;
        socket.y = this.y;
      } else if (socket.type === SOCKET_TYPES.INPUT) {
        socket.x = this.x;
        socket.y = this.y + (
          this.height * (
            (inputsCalculated + 1) / (totalInputs + 1)
          )
        );
        inputsCalculated++;
      } else if (socket.type === SOCKET_TYPES.OUTPUT) {
        socket.x = this.x + this.width;
        socket.y = this.y + (
          this.height * (
            (outputsCalculated + 1) / (totalOutputs + 1)
          )
        );
        outputsCalculated++;
      } else {
        console.error('unknown socket type', socket.type);
      }
    }
  }

  containsPoint(x, y) {
    return (
      this.x < x && this.x + this.width > x
    ) && (
      this.y < y && this.y + this.height > y
    );
  }

  socketsContainPoint(x, y) {
    const maxNodeBoundary = 40;
    if ((
      this.x - maxNodeBoundary > x || this.x + this.width + maxNodeBoundary < x
    ) || (
      this.y - maxNodeBoundary > y || this.y + this.height + maxNodeBoundary < y
    )) {
      // Basic bound check before looking at nodes.
      return false;
    }

    for (const socket of Object.values(this.sockets)) {
      if (socket.containsPoint(x, y)) {
        return socket;
      }
    }
  }

  render({
    ctx,
    mouseTarget,
    mouseX,
    mouseY,
    connectingNode
  }) {
    const isHovered = this.containsPoint(mouseX, mouseY);

    ctx.fillStyle = this.background;
    ctx.strokeStyle = isHovered ? defaultHoverBorder : this.border;
    if (mouseTarget && mouseTarget.type === MOUSE_TARGET_TYPES.NODE && mouseTarget.id === this.id) {
      ctx.strokeStyle = 'cyan';
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = textStyle;
    ctx.textAlign = 'center';
    ctx.fillText(this.title, this.x + (this.width / 2), this.y + padding);

    this.renderSockets({
      ctx,
      mouseX,
      mouseY,
      mouseTarget,
      connectingNode
    });
  }s

  renderSockets({
    ctx,
    mouseX,
    mouseY,
    mouseTarget,
    connectingNode
  }) {
    for (const socket of Object.values(this.sockets)) {
      socket.render({
        ctx,
        mouseX,
        mouseY,
        mouseTarget,
        connectingNode,
        parentNode: this
      });
    }
  }
}


export class DataSourceNode extends Node {
  constructor(props) {
    super({
      ...props,
      title: 'Data Source',
      type: NODE_TYPES.DATA_SOURCE
    });

    this.addSocket({
      type: SOCKET_TYPES.OUTPUT
    });
  }
}

export class BasicStageNode extends Node {
  constructor(props) {
    super({
      ...props,
      type: NODE_TYPES.BASIC_STAGE
    });

    this.addSocket({
      type: SOCKET_TYPES.OUTPUT
    });
    this.addSocket({
      type: SOCKET_TYPES.INPUT
    });

    this.calculateSocketLocations();
  }
}


