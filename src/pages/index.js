import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "./index.css"

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    alt: "Yosemite Valley",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    alt: "Lake Louise",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    alt: "Bald Mountains",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    alt: "Latemar",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    alt: "Vanoise National Park",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    alt: "Lago di Braies",
  },
];
/*
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

  */

// wrappers
const cardsListElement = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");

//add card variables
const addCardBtn = document.querySelector(".profile__add-button");
const closeCardModal = addCardModal.querySelector("#add-card-close");

//preview modal
const modalPreview = document.querySelector("#modal__preview-image");
const closePreviewBtn = document.querySelector("#modal-preview-close");
const modalImageElement = modalPreview.querySelector(".modal__preview");
const previewCaption = modalPreview.querySelector(".modal__caption");

// Buttons + DOM nodes

const profileEditBtn = document.querySelector(".profile__edit-button");
const profileCloseBtn = profileEditModal.querySelector(".modal__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Form data

const nameInput = document.querySelector(".modal__input_type_name");
const descriptionInput = document.querySelector(
  ".modal__input_type_description"
);
const titleInput = addCardForm.querySelector(".modal__input_type_title");
const urlInput = addCardForm.querySelector(".modal__input_type_url");
/*
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}
*/

const cardSelector = "#card-template";

function createCard(data) {
  const card = new Card(data, cardSelector, (name, link) => {
    modalImageElement.src = link;
    modalImageElement.alt = name;
    previewCaption.textContent = name;
    openModal(modalPreview);
  });

  return card.getView();
}

function renderCard(data, wrapper) {
  const cardData = createCard(data);
  wrapper.prepend(cardData);
}

initialCards.forEach((data) => {
  renderCard(data, cardsListElement);
});

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = titleInput.value;
  const link = urlInput.value;
  renderCard({ name, link }, cardsListElement);
  e.target.reset();
  closeModal(addCardModal);
  addCardFormValidator.toggleButtonState();
}

/*

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
 
 
  const likeBtn = cardElement.querySelector(".card__like-button");
  const deleteBtn = cardElement.querySelector(".card__delete-button ");


  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  
  
  

  
  likeBtn.addEventListener("click", handleLikeIcon)
  deleteBtn.addEventListener("click", handleDeleteIcon)
  cardImage.addEventListener('click', ()=> handlePreviewPicture(data))

  return cardElement;
}



const handleLikeIcon = e =>{
  e.target.classList.toggle("card__like-button_active");
}
const handleDeleteIcon = e => {
  e.target.closest('.card').remove
}

const handlePreviewPicture = data =>{
  modalImageElement.src = data.link;
    modalImageElement.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(modalPreview);
}

*/

profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

profileEditBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
addCardBtn.addEventListener("click", () => openModal(addCardModal));

//close with escape

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", pushEscapeClose);
}
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", pushEscapeClose);
}

function pushEscapeClose(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

//overlay and button close

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
    if (e.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
});

const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();
