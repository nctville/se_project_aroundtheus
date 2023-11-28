class Card {
  constructor(
    data,
    cardSelector,
    handleDeleteClick,
    handleLikeClick,
    handleImageClick,
    
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this.isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleDeleteClick = handleDeleteClick;
    this.handleLikeClick = handleLikeClick;
    this._handleImageClick = handleImageClick;
    
  }

  isLiked() {
    return this.isLiked;
  }

  _updateLikes() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this.handleLikeClick(this);
    });

    const deleteBtn = this._cardElement.querySelector(".card__delete-button");
    deleteBtn.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
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
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardTitle = this._cardElement.querySelector(".card__location");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._updateLikes();
    this._setEventListeners();
    return this._cardElement;
  }
}

export default Card;
