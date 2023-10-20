class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._pushEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._pushEscapeClose);
  }

  _handleEscClose(e) {
    e.preventDefault();

    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement/addEventListener('mousedown', (e) =>{
      if (e.target.classList.contains("modal_opened")) {
        this.close()
      }
      if (e.target.classList.contains("modal__close")) {
        this.close()
      }
    })
  }
}

export default Popup;
