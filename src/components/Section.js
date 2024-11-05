export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    //console.log("Items passed to Section:", this._items);
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this.renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
