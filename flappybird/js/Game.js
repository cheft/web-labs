import Base from './base/Base.js';
import ResourceLoader from './ResourceLoader.js';
import Background from './BackGround.js';
import Bird from './Bird.js';
import FPS from './FPS.js';

export default class Game extends Base {
  constructor() {
    super();
    this.canvas = document.getElementById('canvas');
    this.cxt = this.canvas.getContext('2d');
    ResourceLoader.create().load((res) => { this.resourceLoaded(res) });
  }

  resourceLoaded(res) {
    Background.create(this.canvas, this.cxt, res);
    Bird.create(this.canvas, this.cxt, res);

    FPS.create();
  }

}
