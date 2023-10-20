import Popup from './Popup.js'

class PopupWithForms extends Popup{
    constructor({ popupSelector, handleFormSubmit}) {
        super(popupSelector)

        this._popupForm = this._popupElement.querySelector('.modal__form')
        this._handleFormSubmit = handleFormSubmit
    }
    _getInputValues(){}

    setEventListeners(){}

    close(){
        this._popupForm.reset()

        super.close()
    }

}

export default PopupWithForms