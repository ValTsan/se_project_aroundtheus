/* ------------------------------------------------- */
/*                     Modules
/* ------------------------------------------------- */
import "../pages/index.css";
import Card from "../components/Card.js";
import { initialCards } from "../utils/constants.js";
import { settings } from "../utils/constants.js";
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

// /* ------------------------------------------------- */
// /*                 Profile Edit Form
/* ------------------------------------------------- */

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formValues) => {
    userInfo.setUserInfo({
      name: formValues.title,
      job: formValues.description,
    });

    profileEditPopup.close();
    const formName = profileEditPopup.getForm().getAttribute("name");
    const validator = formValidators[formName];
    validator.disableButton();
  }
);
document.querySelector("#profile-edit-button").addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();

  profileEditPopup.setInputValues({
    title: name,
    description: job,
  });

  profileEditPopup.open();
  const formName = profileEditPopup.getForm().getAttribute("name");
  const validator = formValidators[formName];
  validator.resetValidation();
});

/* ------------------------------------------------- */
/*                 Add Card/Image Form 
/* ------------------------------------------------- */
const addCardFormPopup = new PopupWithForm(
  "#profile-add-modal",
  (formValues) => {
    const cardTitle = formValues.title;
    const cardLink = formValues.link;

    const cardData = { name: cardTitle, link: cardLink };

    const formName = addCardFormPopup.getForm().getAttribute("name");
    const validator = formValidators[formName];

    section.renderer(cardData);
    addCardFormPopup.close();
    validator.disableButton(); //disable create button again after submission
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
  imagePopup.open({ name, link });
}
/* ------------------------------------------------- */
/*                 Render Cards/Image 
/* ------------------------------------------------- */
function createCard(item) {
  const cardElement = new Card(item, "#card-form", handleImageClick);
  return cardElement.createCard();
}
const renderer = (cardData) => {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
};

const section = new Section({ items: initialCards, renderer }, ".card__list");
//console.log(initialCards);
section.renderItems();
/* ------------------------------------------------- */
/*                     Form Validation
/* ------------------------------------------------- */
const formValidators = {};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);
