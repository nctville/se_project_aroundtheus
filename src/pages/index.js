import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { config } from "../utils/constants.js";
import Api from "../components/Api.js";
import "./index.css";

//wrappers
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardSelector = "#card-template";

//add card variables
const addCardBtn = document.querySelector(".profile__add-button");

// Buttons + DOM nodes
const profileEditBtn = document.querySelector(".profile__edit-button");

// Form data
const nameInput = document.querySelector(".modal__input_type_name");
const descriptionInput = document.querySelector(
  ".modal__input_type_description"
);

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c06cb1ea-bab9-48c7-8798-47ebeebe8696",
    "Content-Type": "application/json",
  },
});

let section;
api
  .getInitialCards()
  .then((cards) => {
    section = new Section(
      {
        items: cards,
        renderer: createCard,
      },
      ".cards__list"
    );

    section.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

function createCard(data) {
  const card = new Card(data, cardSelector, handleDeleteClick, (name, link) => {
    previewImage.open({ link, name });
  });
  return card.getView();

  }


  function handleDeleteClick(cardId) {
    deleteCardConfirm.open();
  
    deleteCardConfirm.setSubmitAction(() => {
      api.deleteCard(cardId)
        .then(() => {
          deleteCardConfirm.close();
          // Assuming cardId is an object with a _handleDeleteIcon method
          cardId._handleDeleteIcon();
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

api.getInitialInfo().then((userData) => {
  userInfo.setUserInfo({
    name: userData.name,
    description: userData.about,
  });
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

const deleteCardConfirm = new PopupWithConfirmation({
  popupSelector: "#delete-card-modal",
});
deleteCardConfirm.setEventListeners();



const previewImage = new PopupWithImage({
  popupSelector: "#modal__preview-image",
});
previewImage._setEventListeners();




const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

//handle form submits

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
}

function handleAddCardSubmit({ title, url }) {
  api.addNewCard({ name: title, link: url }).then((data) => {
    section.addItem(data);
  });
}

//event listeners

profileEditBtn.addEventListener("click", () => {
  const userValues = userInfo.getUserInfo();
  nameInput.value = userValues.name;
  descriptionInput.value = userValues.job;

  popupEditForm.open();
});

addCardBtn.addEventListener("click", () => {
  addCardFormValidator.disableBtn();
  popupAddCardForm.open();
});
