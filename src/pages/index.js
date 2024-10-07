/* ------------------------------------------------- */
/*                     Modules
/* ------------------------------------------------- */
import "../pages/index.css";
import Card from "../components/Card.js";
import { initialCards } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

/* ------------------------------------------------- */
/*                  Card Template 
/* ------------------------------------------------- */
const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

/* ------------------------------------------------- */
/*                     User Info 
/* ------------------------------------------------- */
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

//const currentUserInfo = userInfo.getUserInfo();
//console.log(currentUserInfo);

/* ------------------------------------------------- */
/*                 Profile Edit Form 
/* ------------------------------------------------- */
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formValues) => {
    console.log(formValues);

    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");

    profileTitle.textContent = formValues.title;
    profileDescription.textContent = formValues.description;

    profileEditPopup.close();
  }
);
document.querySelector("#profile-edit-button").addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  console.log(userInfo.getUserInfo());
  const nameInput = document.querySelector("input[name='title']");
  const jobInput = document.querySelector("input[name='description']");

  if (nameInput && jobInput) {
    nameInput.value = name;
    jobInput.value = job;
  } else {
    console.error("Input elements not found");
  }

  profileEditPopup.open();
});
/* ------------------------------------------------- */
/*                 Add Card/Image Form 
/* ------------------------------------------------- */
const addCardFormPopup = new PopupWithForm(
  "#profile-add-modal",
  (formValues) => {
    console.log("Link provided:", formValues.link);
    const cardTitle = formValues.title;
    const cardLink = formValues.link;

    const cardData = { name: cardTitle, link: cardLink };
    section._renderer(cardData);

    addCardFormPopup.close();
  }
);

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardFormPopup.open();
});
/* ------------------------------------------------- */
/*                 Preview Image Popup 
/* ------------------------------------------------- */
const imagePopup = new PopupWithImage("#preview-modal");
imagePopup.setEventListeners();

function handleImageClick(link, name) {
  //console.log("Image clicked!", { link, name });
  imagePopup.open({ name, link });
}
/* ------------------------------------------------- */
/*                 Render Cards/Image 
/* ------------------------------------------------- */

const renderer = (cardData) => {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
};

function createCard(item) {
  const cardElement = new Card(item, "#card-form", handleImageClick);
  return cardElement.createCard();
}

const section = new Section({ items: initialCards, renderer }, ".card__list");
section.renderItems();

/* ------------------------------------------------- */
/*                     Form Validation 
/* ------------------------------------------------- */
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_has-error",
  errorClass: "modal__error_visible",
};

const modalForms = document.querySelectorAll(".modal__form");
modalForms.forEach((currentForm) => {
  const modalFormValidator = new FormValidator(settings, currentForm);
  modalFormValidator.enableValidation();
});
