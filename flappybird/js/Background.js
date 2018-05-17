import Base from './base/Base.js';

export default class Background extends Base {
  constructor(canvas, cxt, res) {
    super();
    this.canvas = canvas;
    this.cxt = cxt;
    this.res = res;
    this.redraw();
  }

  redraw() {
    this.move(this.res.get('background'));
    const land = this.res.get('land');
    this.move(land, 0, this.canvas.height - land.height, 2, 2);
  }

  // 背景横向往左移动
  move(img, x = 0, y = 0, speed = 1, offset = 0) {
    this.cxt.drawImage(img, x, y);
    requestAnimationFrame(() => {
      if (x <= -img.width) {
        x = 0;
      }
      if (x <= -(img.width - this.canvas.width)) {
        this.cxt.drawImage(img, x + img.width - offset, y);
      }
      this.move(img, x -= speed, y, speed, offset);
    });
  }
}