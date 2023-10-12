class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    const likeBtn = this._cardElement.querySelector(".card__like-button");
    likeBtn.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    const deleteBtn = this._cardElement.querySelector(".card__delete-button");
    deleteBtn.addEventListener("click", () => {
      this._handleDeleteIcon();
    });

    this._cardElement.addEventListener("click", () =>
      this.handleImageClick(data)
    );
  }
/*
  _handlePreviewPicture() {
    this._modalImageElement.src = data.link;
    this._modalImageElement.alt = data.name;
    this._previewCaption.textContent = data.name;
    this._handleImageClick(this._link, this._name);
  }
  */

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
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const cardTitle = this._cardElement.querySelector(".card__location");
    const cardImage = this._cardElement.querySelector(".card__image");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}

export default Card;
