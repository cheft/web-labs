import Base from './base/Base.js';

export default class FPS extends Base {
  constructor() {
    super();
    this.fps = 0;
    this.node = document.getElementById('fps');
    this.node.style.display = 'block';
    this.redraw();
  }
  
  redraw() {
    if (this.fps === 0) {
      this.time = +new Date();
    }
    this.fps++;
    if (+new Date() - this.time >= 1000) {
      this.node.innerText = this.fps;
      this.fps = 0;
    }
    requestAnimationFrame(() => {
      this.redraw();
    });
  }
}