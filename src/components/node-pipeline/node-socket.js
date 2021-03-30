
const defaultBackground = 'white';
// 'rgba(220, 240, 240, 0.3)';
const defaultHoverBorder = 'purple';
const defaultBorder = 'black';
const defaultSocketSize = 8;
const defaultHoveredSize = defaultSocketSize + 3;
const textPadding = defaultSocketSize / 2;

const textStyle = 'black';

const UNSET_TITLE = 'UNSET_TITLE';

export const SOCKET_TYPES = {
  INPUT: 'INPUT',
  OUTPUT: 'OUTPUT'
};

function getDistanceBetweenPoints(
  x2, y2, x1, y1
) {
  return (Math.sqrt(
    ((x1 - x2) * (x1 - x2))
    + ((y1 - y2) * (y1 - y2))
  ));
}

export default class Socket {
  constructor({
    id,
    title = UNSET_TITLE,
    x,
    y,
    radius = defaultSocketSize,
    hoveredRadius = defaultHoveredSize,
    background = defaultBackground,
    border = defaultBorder,
    attachedFieldId = null,
    type
  }) {
    this.title = title;
    if (title === UNSET_TITLE) {
      this.title = 'Click and drag to connect to another stage';
    }
    this.x = x;
    this.y = y;

    this.id = id;

    this.background = background;
    this.border = border;

    this.radius = radius;
    this.hoveredRadius = hoveredRadius;

    this.attachedFieldId = attachedFieldId;
    this.type = type;
  }

  moveSocket(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  containsPoint(x, y) {
    return getDistanceBetweenPoints(
      this.x, this.y, x, y
    ) < this.hoveredRadius;
  }

  render({
    ctx,
    mouseX,
    mouseY
  }) {
    const isHovered = this.containsPoint(mouseX, mouseY);

    const radius = isHovered ? this.hoveredRadius : this.radius;
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.background;
    ctx.fill();
    // ctx.lineWidth = 1;
    ctx.strokeStyle = isHovered ? defaultHoverBorder : this.border;
    ctx.stroke();

    if (isHovered && this.title) {
      // Show a hover tooltip.
      ctx.fillStyle = textStyle;
      ctx.textAlign = 'center';
      ctx.fillText(this.title, this.x, this.y - (radius + textPadding));
    }
  }
}
