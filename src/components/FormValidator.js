class FormValidator{
  constructor(config, formEl) {
    this._formEl = formEl;
   
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError(inputEl) {
    const errorMesseageEl = this._formEl.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.add(this._inputErrorClass);
    errorMesseageEl.textContent = inputEl.validationMessage;
    errorMesseageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.remove(this._errorClass);
  }

  _enableBtn() {
    this._submitBtn.classList.remove(this._inactiveButtonClass);
    this._submitBtn.disabled = false;
    
  }

  disableBtn() {
    this._submitBtn.classList.add(this._inactiveButtonClass);
    this._submitBtn.disabled = true;
  }

  toggleButtonState() {
   

    if (this._hasInvalidInput()) {
      this.disableBtn(this._submitBtn);
    } else {
      this._enableBtn(this._submitBtn);
    }
  }

  _hasInvalidInput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _setEventListeners() {
    
    this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._submitBtn = this._formEl.querySelector(this._submitButtonSelector);
  
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this.toggleButtonState();
      });
    });
  }
  

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }


}






export default FormValidator