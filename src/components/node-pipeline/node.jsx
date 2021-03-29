
const defaultBackground = 'rgba(240, 240, 240, 0.5)';
const defaultBorder = 'black';
const textStyle = 'black';
const padding = 25;

export default class Node {
  constructor({
    ctx,
    title,
    x,
    y
  }) {
    this.title = title;
    this.x = x;
    this.y = y;

    this.background = defaultBackground;
    this.border = defaultBorder;

    const textWidth = ctx.measureText(title).width;

    // TODO: Calc width.
    this.width = textWidth + (padding * 2);
    this.height = 100 + (padding * 2);
  }

  render(ctx) {
    ctx.fillStyle = this.background;
    ctx.strokeStyle = this.border;
    ctx.fillRect(this.x, this.x, this.width, this.height);
    ctx.strokeRect(this.x, this.x, this.width, this.height);

    ctx.fillStyle = textStyle;
    ctx.textAlign = 'center';
    ctx.fillText(this.title, this.x + (this.width / 2), this.y + padding);
  }
}
