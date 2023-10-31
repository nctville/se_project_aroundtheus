import Popup from "./Popup.js"

class PopupWithImage extends Popup {
   constructor({popupSelector}) {
     super({popupSelector});
     this._image = this._popupElement.querySelector('.modal__preview');
     this._caption = this._popupElement.querySelector('.modal__caption');
     //this._setEventListeners();
   }
 
   open({link, name}) {
     this._image.src = link;
     this._image.alt = name;
     this._caption.textContent = name;
     super.open();
   }

   close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
 }


export default PopupWithImage