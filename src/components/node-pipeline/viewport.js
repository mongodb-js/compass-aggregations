
const defaultBackground = '#FAFAFA';
// 'rgba(220, 240, 240, 0.3)';
// const defaultHoverBorder = 'purple';
const defaultBorder = 'black';
// const defaultSocketSize = 5;
// const defaultHoveredSize = 6;
// const textPadding = 4;

export default class Viewport {
  constructor({
    x = 0,
    y = 0,
    panningX = 0,
    panningY = 0,
    background = defaultBackground,
    border = defaultBorder,
    width = 1000,
    height = 1000
  } = {}) {
    this.x = x;
    this.y = y;

    this.panningX = panningX;
    this.panningY = panningY;

    this.background = background;
    this.border = border;

    this.width = width;
    this.height = height;
  }

  dragViewport(dx, dy) {
    this.panningX += dx;
    this.panningY += dy;
  }

  renderOffset({
    ctx
  }) {
    ctx.translate(this.panningX, this.panningY);

    ctx.fillStyle = this.background;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = this.border;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  // resetOffset({
  //   ctx
  // }) {

  // }
}
