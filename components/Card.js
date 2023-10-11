class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;

    this._handleImageClick = handleImageClick;
  }

  _getTemplate(){
    const cardElement = document
    .querySelector(this._cardSelector)
    .content.querySelector(".card")
    .cloneNode(true);
  
    return cardElement
  }

  _setEventListeners() {
    const likeBtn = this._cardElement.querySelector(".card__like-button");
    likeBtn.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    const deleteBtn = this._cardElement.querySelector(".card__delete-button ");
    deleteBtn.addEventListener("click", () =>{ 
      this._handleDeleteIcon();
    });

    this._cardElement
    .querySelector(".cards__image")
    .addEventListener("click", () => {
      this._handleImageClick(data);
    });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteIcon() {
    this._cardElement.remove();
    this._cardElement = null;
}



  getView() {
    this._cardElement = this._getTemplate()

    this._cardElement.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._cardElement.querySelector(".card__location").textContent;

  

    this._setEventListeners();

  }
}

export default Card;
