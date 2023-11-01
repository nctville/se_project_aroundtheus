import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";
import "./index.css";

//wrappers
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");

//add card variables
const addCardBtn = document.querySelector(".profile__add-button");

// Buttons + DOM nodes
const profileEditBtn = document.querySelector(".profile__edit-button");


// Form data
const nameInput = document.querySelector(".modal__input_type_name");
const descriptionInput = document.querySelector(
  ".modal__input_type_description"
);


//Objects
const previewImage = new PopupWithImage({
  popupSelector: "#modal__preview-image",
});
const cardSelector = "#card-template";

previewImage._setEventListeners();
function createCard(data) {
  const card = new Card(data, cardSelector, (name, link) => {
    previewImage.open({ link, name });
  });
  return card.getView();
}

const section = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);
section.renderItems();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

const popupEditForm = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileFormSubmit,
});
popupEditForm.setEventListeners();

const popupAddCardForm = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardSubmit,
});
popupAddCardForm.setEventListeners();

const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

//handle form submits

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
}

function handleAddCardSubmit({ title, url }) {
  section.addItem({ name: title, link: url });
}

//event listeners

profileEditBtn.addEventListener("click", () => {
 
  const userValues = userInfo.getUserInfo();
  nameInput.value = userValues.name;
  descriptionInput.value = userValues.job;

  popupEditForm.open();
});

addCardBtn.addEventListener("click", () => {
  addCardFormValidator.disableBtn()
  popupAddCardForm.open();
});

