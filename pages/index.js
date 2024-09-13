import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const previewModal = document.querySelector("#preview-modal");
const modals = document.querySelectorAll(".modal");

// PROFILE/EDIT FORM
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const addCardFormElement = profileAddModal.querySelector("#add-card-form");
const profileTitle = document.querySelector(".profile__title");

// PROFILE INFO INPUT
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// IMAGE FORM INPUT
const addCardTitleInput = addCardFormElement.querySelector(
  "#add-card-title-input"
);
const imageLinkInput = addCardFormElement.querySelector("#image-link-input");

// TEMPLATE/CARDS LIST
const cardListEl = document.querySelector(".card__list");
const cardTemplate =
  document.querySelector("#card-form").content.firstElementChild;

// BUTTONS
const profileEditBtn = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".modal__close");

// PREVIEW POP UP
const previewImageModal = previewModal.querySelector(".modal__preview-image");
const previewCaption = previewModal.querySelector(".modal__preview-caption");

/* ------------------------------------------------- */
/*                     Functions
/* ------------------------------------------------- */

//ESC FUNCTION
function addEscListener(modal) {
  function closeModalOnEsc(event) {
    if (event.key === "Escape") {
      handleClose(modal);
    }
  }
  document.addEventListener("keydown", closeModalOnEsc);
  return closeModalOnEsc;
}

//CLOSE MODAL FUNCTION
function handleClose(modal) {
  if (modal) {
    closeModal(modal);
  }
}

//OPEN MODAL FUNCTION
function openModal(modal) {
  if (modal) {
    modal.classList.add("modal_opened");
    modal.closeModalOnEsc = addEscListener(modal);
  }
}

// CLOSE FUNCTION
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", modal.closeModalOnEsc);
}

// RENDER CARD
function renderCard(cardData, wrapper = cardListEl, method = "prepend") {
  const card = new Card(cardData, "#card-form", handleImageClick);
  const cardElement = card.createCard();
  wrapper[method](cardElement);
}

// PREVIEW IMAGE FUNCTION
function showPreview(imageSrc, imageAlt) {
  if (previewImageModal) {
    previewImageModal.src = imageSrc;
    previewImageModal.alt = imageAlt;
    previewCaption.textContent = imageAlt;

    openModal(previewModal);
  } else {
    console.error("previewImageModal not found.");
  }
}

//NEW CARD TEMPLATE
const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(cardData, "#card-form");

function handleImageClick(link, name) {
  showPreview(link, name);
}

initialCards.forEach((data) => {
  const card = new Card(data, "#card-form", handleImageClick);
  const cardElement = card.createCard();
});

/* ------------------------------------------------- */
/*                     Event Handlers
/* ------------------------------------------------- */

// EDIT PROFILE HANDLER
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModal(profileEditModal);
}

// ADD IMAGE HANDLER
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = addCardTitleInput.value;
  const link = imageLinkInput.value;
  renderCard({ name, link });
  e.target.reset();
  closeModal(profileAddModal);
}

/* ------------------------------------------------- */
/*                     Event Listeners
/* ------------------------------------------------- */

//PROFILE INFO ADDED
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

//FORM LISTENERS
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//ADD NEW CARD
addNewCardButton.addEventListener("click", () => openModal(profileAddModal));

initialCards.forEach((cardData) => renderCard(cardData));

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal__overlay")) {
      closeModal(modal);
    }

    if (evt.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
});

//FORM VALIDATION

const formConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_has-error",
  errorClass: "modal__error_visible",
};

const formList = Array.from(document.querySelectorAll(formConfig.formSelector));

formList.forEach((formElement) => {
  const formValidator = new FormValidator(formConfig, formElement);
  formValidator.enableValidation();

  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();

    formValidator.resetValidation();
    formValidator.disableButtonAfterSubmit();
    formElement.reset();
  });
});
