import { v4 as uuidv4 } from 'uuid';

import Socket from './node-socket';

const defaultBackground = 'rgba(240, 240, 240, 0.5)';
const defaultHoverBorder = 'purple';
const defaultBorder = 'black';
const textStyle = 'black';
const padding = 25;

export default class Node {
  constructor({
    ctx,
    id,
    title,
    x,
    y,
    background = defaultBackground,
    border = defaultBorder
  }) {
    this.title = title;
    this.x = x;
    this.y = y;

    this.id = id;

    this.background = background;
    this.border = border;

    const textWidth = ctx.measureText(title).width;

    // TODO: Calc width.
    this.width = textWidth + (padding * 2);
    this.height = 100 + (padding * 2);

    // todo: uuid
    const socketId = uuidv4();
    this.sockets = {
      socketId: new Socket({
        id: socketId,
        x: this.x + this.width,
        y: this.y + (this.height / 2),
        title: 'Click and drag to connect to another stage'
      })
    };
  }

  dragNode(dx, dy) {
    this.x += dx;
    this.y += dy;

    for (const socket of Object.values(this.sockets)) {
      socket.moveSocket(dx, dy);
    }
  }

  containsPoint(x, y) {
    return (
      this.x < x && this.x + this.width > x
    ) && (
      this.y < y && this.y + this.height > y
    );
  }

  render({
    ctx,
    mouseX,
    mouseY
  }) {
    const isHovered = this.containsPoint(mouseX, mouseY);

    ctx.fillStyle = this.background;
    ctx.strokeStyle = isHovered ? defaultHoverBorder : this.border;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = textStyle;
    ctx.textAlign = 'center';
    ctx.fillText(this.title, this.x + (this.width / 2), this.y + padding);

    for (const socket of Object.values(this.sockets)) {
      socket.render({
        ctx,
        // TODO: Remove infavor of using mouse target state?
        mouseX,
        mouseY
      });
    }
  }
}
