import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForms from "../components/PopupWithForms.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";
import "./index.css";

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
//SECTION
const cardSelector = "#card-template";


function createCard(data) {
  const card = new Card(data, cardSelector, (name, link) => {
    // modalImageElement.src = link;
    // modalImageElement.alt = name;
    // previewCaption.textContent = name;
    // openModal(modalPreview);
    const popUp = new PopupWithImage({
      popupSelector: "#modal__preview-image",
    });
    popUp.open({ link, name });
  });

  return card.getView();
}

function renderCard(data, wrapper) {
  const cardData = createCard(data);
  wrapper.prepend(cardData);
}

const section = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);
section.renderItems();

/* SECTION CLASS
initialCards.forEach((data) => {
  renderCard(data, cardsListElement);
});
*/

const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector:'.profile__description'})

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  // closeModal(profileEditModal);
}

function handleAddCardSubmit(data) {
  userInfo.setUserInfo(data);
  const name = titleInput.value;
  const link = urlInput.value;
  renderCard({ name, link }, cardsListElement);
  e.target.reset();
  e.preventDefault()
  // closeModal(addCardModal);
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

 //profileEditForm.addEventListener("submit", handleProfileFormSubmit);
 //addCardForm.addEventListener("submit", handleAddCardSubmit);

profileEditBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  // openModal(profileEditModal);
  const popupForm = new PopupWithForms({
    popupSelector: "#profile-edit-modal",
    handleFormSubmit: handleProfileFormSubmit,
  });
  popupForm.open();
});
addCardBtn.addEventListener("click", () => {
  // openModal(addCardModal);
  const popUp = new PopupWithForms({
    popupSelector: "#add-card-modal",
    handleFormSubmit: handleAddCardSubmit,
  });
  popUp.open();
});

//close with escape

// function closeModal(modal) {
//  modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", pushEscapeClose);
// }
// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", pushEscapeClose);
// }

// function pushEscapeClose(e) {
//   if (e.key === "Escape") {
//     const openedModal = document.querySelector(".modal_opened");
//     closeModal(openedModal);
//   }
// }

//overlay and button close

// const modals = document.querySelectorAll(".modal");
// modals.forEach((modal) => {
//   modal.addEventListener("mousedown", (e) => {
//     if (e.target.classList.contains("modal_opened")) {
//       closeModal(modal);
//     }
//     if (e.target.classList.contains("modal__close")) {
//       closeModal(modal);
//     }
//   });
// });

const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();
