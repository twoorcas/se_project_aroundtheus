export default class Section {
  constructor({ items, renderer }, containerSlector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSlector);
  }

  addItem(element) {
    this._container.prepend(element);
  }
  addInitialItem(element) {
    this._container.append(element);
  }
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
