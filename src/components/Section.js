export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}

//Section Class :To add elements to the DOM
//First Parameter: Object with 2 properties (items and renderer)
//Items : Array of data, must add to the page when it loads
//Renderer:Function :creates and adds a single item to the page
//second Parameter:Class where you'll add the card elements
//renderItems(): public, render all elements, should iterate through the items array and call the renderer(),so forEach, should be called once page loads
//addItem(): public, takes DOM elements and add it to the contain er
