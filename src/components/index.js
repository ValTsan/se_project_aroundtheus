/* ------------------------------------------------- */
/*                     Modules
/* ------------------------------------------------- */

import "../pages/index.css";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

/* ------------------------------------------------- */
/*                     Initial Cards
/* ------------------------------------------------- */

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* ------------------------------------------------- */
/*                     Elements
/* ------------------------------------------------- */

// WRAPPERS
//const profileEditModal = document.querySelector("#profile-edit-modal");
//const profileAddModal = document.querySelector("#profile-add-modal");
//const previewModal = document.querySelector("#preview-modal");
//const modals = document.querySelectorAll(".modal");

// PROFILE/EDIT FORM
//const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
//const addCardFormElement = profileAddModal.querySelector("#add-card-form");
const profileTitle = document.querySelector(".profile__title");

// PROFILE INFO INPUT
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// IMAGE FORM INPUT
//const addCardTitleInput = addCardFormElement.querySelector(
// "#add-card-title-input"
//);
//const imageLinkInput = addCardFormElement.querySelector("#image-link-input");

// TEMPLATE/CARDS LIST
//const cardListEl = document.querySelector(".card__list");
//const cardTemplate =
//document.querySelector("#card-form").content.firstElementChild;

// BUTTONS
const profileEditBtn = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".modal__close");

// PREVIEW POP UP
//const previewImageModal = previewModal.querySelector(".modal__preview-image");
//const previewCaption = previewModal.querySelector(".modal__preview-caption");

/* ------------------------------------------------- */
/*                     Functions
/* ------------------------------------------------- */

//CLOSE MODAL FUNCTION
//function handleClose(modal) {
//if (modal) {
// closeModal(modal);
//}
//}

// RENDER CARD
//function renderCard(cardData, wrapper = cardListEl, method = "prepend") {
//const card = new Card(cardData, "#card-form", handleImageClick);
// const cardElement = card.createCard();
//wrapper[method](cardElement);
//}

//REFACTORED NEW CARD TEMPLATE
const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

// PREVIEW IMAGE FUNCTION
//function showPreview(imageSrc, imageAlt) {
//if (previewImageModal) {
//previewImageModal.src = imageSrc;
//previewImageModal.alt = imageAlt;
//previewCaption.textContent = imageAlt;

//open(showPreview);
//}
//}

//function handleImageClick(link, name) {
//showPreview(link, name);
//}

//Refactored PopupWithForm Method/Function
const profilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);

function handleProfileFormSubmit(formData) {
  console.log("Form submitted with:", formData);
}
//REFACTORED IMAGE PREVIEW FUNCTION (PopupWithImage.js)
const imagePopup = new PopupWithImage("#preview-modal");
imagePopup.setEventListeners();

function handleImageClick(link, name) {
  imagePopup.open({ name, link });
}

//REFACTORED CARDS RENDERER FUNCTION (Section.js)
const renderer = (cardData) => {
  const card = new Card(cardData, "#card-form", handleImageClick);
  const cardElement = card.createCard();
  section.addItem(cardElement);
};

const section = new Section({ items: initialCards, renderer }, ".card__list");
//section.renderItems();

/* ------------------------------------------------- */
/*                     Event Handlers
/* ------------------------------------------------- */

// EDIT PROFILE HANDLER
//function handleProfileEditSubmit(e) {
//e.preventDefault();
//profileTitle.textContent = profileTitleInput.value;
//profileDescription.textContent = profileDescriptionInput.value;

//closeModal(profileEditModal);
//}

// ADD IMAGE HANDLER
//function handleAddCardFormSubmit(e) {
//e.preventDefault();
//const name = addCardTitleInput.value;
// const link = imageLinkInput.value;
// renderer({ name, link });
// e.target.reset();
//  addFormValidator.disableButton();
//closeModal(profileAddModal);
//}

/* ------------------------------------------------- */
/*                     Event Listeners
/* ------------------------------------------------- */

//FORM LISTENERS
//profileEditForm.addEventListener("submit", handleProfileEditSubmit);
//addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//ADD NEW CARD
addNewCardButton.addEventListener("click", () => open(profileAddModal));

initialCards.forEach((cardData) => renderer(cardData));

//const editFormValidator = new FormValidator(settings, profileEditForm);
//const addFormValidator = new FormValidator(settings, addCardFormElement);

//editFormValidator.enableValidation();
//addFormValidator.enableValidation();

//PROFILE INFO ADDED
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  //profileFormPopup.resetValidation();
  open(profilePopup);
});

//FORM VALIDATION
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_has-error",
  errorClass: "modal__error_visible",
};

// Profile Edit Form
const profileFormPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    console.log("Profile Edit Form Submitted:", formData);
  }
);
profileFormPopup.setEventListeners();
profileFormPopup._getInputValues();

// Add Card Form
const addCardFormPopup = new PopupWithForm("#add-card-modal", (formData) => {
  console.log("Add Card Form Submitted:", formData);
});
addCardFormPopup.setEventListeners();
