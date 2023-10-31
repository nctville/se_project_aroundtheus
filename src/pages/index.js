import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForms from "../components/PopupWithForms.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";
import "./index.css";

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

//SECTION
const cardSelector = "#card-template";

function createCard(data) {
  const card = new Card(data, cardSelector, (name, link) => {
    const previewImage = new PopupWithImage({
      popupSelector: "#modal__preview-image",
    });
    previewImage.open({ link, name });
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

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
}

function handleAddCardSubmit() {
  const name = titleInput.value;
  const link = urlInput.value;
  renderCard({ name, link }, cardsListElement);
}

const popupEditForm = new PopupWithForms({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileFormSubmit,
});
profileEditBtn.addEventListener("click", () => {
  userInfo.getUserInfo()
  popupEditForm.open();
});

popupEditForm.setEventListeners();

const popupAddCardForm = new PopupWithForms({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardSubmit,
});
addCardBtn.addEventListener("click", () => {
  popupAddCardForm.open();
});

popupAddCardForm.setEventListeners()

const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();
