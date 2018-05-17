export default class Base {

  static create() {
    if (!this.instance) {
      this.instance = new this(...arguments);
    }
    return this.instance;
  }
}
