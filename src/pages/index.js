/* ------------------------------------------------- */
/*                     Modules
/* ------------------------------------------------- */
import "../pages/index.css";
import Card from "../components/Card.js";
import { initialCards } from "../utils/constants.js";
//import FormValidator from "./FormValidator.js";
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

const currentUserInfo = userInfo.getUserInfo();
//console.log(currentUserInfo);

/* ------------------------------------------------- */
/*                 Profile Edit Form 
/* ------------------------------------------------- */
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formValues) => {
    //console.log("Form values received:", formValues);

    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");

    profileTitle.textContent = formValues.title;
    profileDescription.textContent = formValues.description;

    profileEditPopup.close();
  }
);
document.querySelector("#profile-edit-button").addEventListener("click", () => {
  profileEditPopup.open();
});
/* ------------------------------------------------- */
/*                 Add Card/Image Form 
/* ------------------------------------------------- */
const addCardFormPopup = new PopupWithForm(
  "#profile-add-modal",
  (formValues) => {
    const cardTitle = formValues.title;
    const cardLink = formValues.link;

    const newCard = new Card(
      { name: cardTitle, link: cardLink },
      "#card-form",
      handleImageClick
    );
    const cardElement = newCard.createCard();

    document.querySelector(".card__list").prepend(cardElement);
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
  imagePopup.open({ name, link });
}
/* ------------------------------------------------- */
/*                 Render Cards/Image 
/* ------------------------------------------------- */
const renderer = (cardData) => {
  const card = new Card(cardData, "#card-form", handleImageClick);
  const cardElement = card.createCard();
  section.addItem(cardElement);
};

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
