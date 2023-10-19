import Popup from "./Popup.js"

class PopupWithImages extends Popup{
   open({ link, name}){
    this._popupElement.querySelector('.modal__caption').previewCaption.textContent = name
    const modalImageElement = this._popupElement.querySelector('.modal__preview')
        modalImageElement.src = link;
        modalImageElement.alt = name;
     super.open()
   
      
}
}
export default PopupWithImages