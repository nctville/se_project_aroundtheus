import Popup from './Popup.js'

class PopupWithForms extends Popup{
    constructor( popupElement, handleFormSubmit) {
        super({popupElement})

        this._popupForm = this._popupElement.querySelector('.modal__form')
        this._handleFormSubmit = handleFormSubmit
    }
    _getInputValues(){
        this._profileEditForm = profileEditModal.querySelector(".modal__form");
        this._addCardForm = addCardModal.querySelector(".modal__form");
    }

    setEventListeners(){
        this._profileEditForm.addEventListener("submit", this._handleFormSubmit);
        this._addCardForm.addEventListener("submit", this._handleFormSubmit);
        super.setEventListeners();

    }

    close(){
        this._popupForm.reset()

        super.close()
    }

}

export default PopupWithForms