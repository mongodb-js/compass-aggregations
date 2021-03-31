
const defaultStroke = 'purple';
// 'rgba(220, 240, 240, 0.3)';
const defaultHoverStroke = 'purple';

// const textStyle = 'black';

const UNSET_TITLE = 'UNSET_TITLE';

export default class Connector {
  constructor({
    id,
    title = UNSET_TITLE,
    end = null,
    start = null,
    stroke = defaultStroke,
    hoverStroke = defaultHoverStroke
  }) {
    this.title = title;

    this.start = start;
    this.end = end;

    this.id = id;

    this.stroke = stroke;
    this.hoverStroke = hoverStroke;
  }

  // containsPoint(x, y) {
  //   return getDistanceBetweenPoints(
  //     this.x, this.y, x, y
  //   ) < this.hoveredRadius;
  // }

  // eslint-disable-next-line complexity
  render({
    ctx,
    mouseX,
    mouseY,
    mouseTarget,
    nodes
  }) {
    // const isHovered = this.containsPoint(mouseX, mouseY);

    ctx.strokeStyle = this.stroke;

    if ((!this.start || !this.end) && !mouseTarget) {
      return;
    }

    if (mouseTarget && !this.start) {
      if (nodes[this.end.nodeId] && nodes[this.end.nodeId].sockets[this.end.socketId]) {
        ctx.beginPath();
        ctx.lineTo(
          mouseX,
          mouseY
        );
        ctx.lineTo(
          nodes[this.end.nodeId].sockets[this.end.socketId].x,
          nodes[this.end.nodeId].sockets[this.end.socketId].y
        );
        ctx.stroke();
      }

      return;
    } else if (mouseTarget && !this.end) {
      if (nodes[this.start.nodeId] && nodes[this.start.nodeId].sockets[this.start.socketId]) {
        ctx.beginPath();
        ctx.lineTo(
          nodes[this.start.nodeId].sockets[this.start.socketId].x,
          nodes[this.start.nodeId].sockets[this.start.socketId].y
        );
        ctx.lineTo(
          mouseX,
          mouseY
        );
        ctx.stroke();
      }
      return;
    }

    if (
      (nodes[this.start.nodeId] && nodes[this.start.nodeId].sockets[this.start.socketId])
      && (nodes[this.end.nodeId] && nodes[this.end.nodeId].sockets[this.end.socketId])
    ) {
      ctx.beginPath();
      ctx.lineTo(
        nodes[this.start.nodeId].sockets[this.start.socketId].x,
        nodes[this.start.nodeId].sockets[this.start.socketId].y
      );
      ctx.lineTo(
        nodes[this.end.nodeId].sockets[this.end.socketId].x,
        nodes[this.end.nodeId].sockets[this.end.socketId].y
      );
      ctx.stroke();
    }

    // const radius = isHovered ? this.hoveredRadius : this.radius;
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
    // ctx.fillStyle = this.background;
    // ctx.fill();
    // // ctx.lineWidth = 1;
    // ctx.strokeStyle = isHovered ? defaultHoverBorder : this.border;
    // ctx.stroke();

    // if (isHovered && this.title) {
    //   // Show a hover tooltip.
    //   ctx.fillStyle = textStyle;
    //   ctx.textAlign = 'center';
    //   ctx.fillText(this.title, this.x, this.y - (radius + textPadding));
    // }
  }
}
