import Sprite from './base/Sprite.js';

export default class BackGround extends Sprite {
  constructor(canvas, cxt, res) {
    super();
    this.canvas = canvas;
    this.res = res;
    this.cxt = cxt;
    this.brid = res.get('birds');
    this.fps = 0;
    this.pos = 0;
    this.redraw();
  }
  
  redraw() {
    this.animate();
    requestAnimationFrame(() => {
      this.redraw();
    });
  }

  animate() {
    this.cxt.drawImage(this.brid, 52 * this.pos, 0, 52, 52, 
      (this.canvas.width - 52) / 2, (this.canvas.height - 52) / 2, 52, 52);
    this.fps++;
    this.pos = Math.ceil(this.fps / 30);
    if (this.fps >= 60) {
      this.fps = 0;
    }
  }
}