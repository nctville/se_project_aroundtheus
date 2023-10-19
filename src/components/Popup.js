class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }
  open() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._pushEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._pushEscapeClose);
  }
  _pushEscapeClose() {
    if (e.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("modal_opened")) {
        this.close();
      }
      if (e.target.classList.contains("modal__close")) {
        this.close();
      }
    });
  }
}

export default Popup;
