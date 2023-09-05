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

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// wrappers
const cardsListElement = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");

//add card variables
const addCardBtn = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const closeCardModal = document.querySelector("#add-card-close");

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

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
//function openModal() {
//nameInput.value = profileName.textContent;
//descriptionInput.value = profileDescription.textContent;
//profileEditModal.classList.add("modal_opened");
//}
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(profileEditModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__location");

  const likeBtn = cardElement.querySelector('.card__like-button');
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle('card__like-button_active')
  });

  const deleteBtn = cardElement.querySelector('.card__delete-button ');
  deleteBtn.addEventListener("click", () => {
    cardElement.remove()
  });

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

profileEditForm.addEventListener("submit", handleProfileFormSubmit);
profileEditBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileCloseBtn.addEventListener("click", () => closeModal(profileEditModal));

addCardBtn.addEventListener("click", () => openModal(addCardModal));
closeCardModal.addEventListener("click", () => closeModal(addCardModal));

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsListElement.prepend(cardElement);
});

