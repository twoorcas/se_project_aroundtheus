export default class Section {
  constructor({ items, renderer }, containerSlector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSlector);
  }

  addItem(element) {
    this._container.append(element);
  }
  //This method should be called when adding an individual card to the DOM.
  //takes a DOM element and adds it to the container
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
    //This method should be called once on page load.
  }
}
// to add elements to the DOM
