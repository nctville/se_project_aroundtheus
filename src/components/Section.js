class Section {
    constructor({ items, renderer }, containerSelector) {
      this._items = items;
      this._renderer = renderer;
      this._containerSelector = document.querySelector(containerSelector);
    }
  
    renderItems() {
      this._items.forEach((item) => {
        this._renderer(item, this._containerSelector);
      });
    }
  
    addItem(element) {
      this._containerSelector.prepend(element);
    }
  }
  
  export default Section;
