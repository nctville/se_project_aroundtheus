import Popup from "./Popup.js";

import Popup from './Popup.js'

class PopupWithForms extends Popup{
    constructor({ popupSelector, handleFormSubmit}) {
        super(popupSelector)

        this._popupForm = this._popupElement.querySelector('.modal__form')

        this._handleFormSubmit = handleFormSubmit
    }
    _getInputValues(){
        const formValues = {};
        this._popupInput = this._popupForm.querySelectorAll(".modal__input");
        this._popupInput.forEach((input) => {
          formValues[input.name] = input.value;
        });
        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (e) => {
          e.preventDefault();
          this._handleFormSubmit(this.getInputValues());
          this.close();
        });
      }

    close(){
        this._popupForm.reset()

        super.close()
    }

}

export default PopupWithForms