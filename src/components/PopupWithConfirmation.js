import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });

    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._saveButton = this._popupForm.querySelector(".modal__button");

  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super._setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
    
  }
}

export default PopupWithConfirmation;
