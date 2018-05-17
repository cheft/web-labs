import Base from './base/Base.js'
import res from './Resource.js';

export default class ResourceLoader extends Base {
  constructor() {
    super();
    this.res = new Map(res);
  }

  load(callback) {
    let count = 0;
    for (let [key, value] of this.res) {
      const img = new Image();
      img.src = value;
      this.res.set(key, img);

      img.onload = () => {
        count++;
        if (count === this.res.size) {
          callback && callback(this.res);
        }
      }
    }
  }
}
