/* ------------------------------------------------- */
/*                     Modules
/* ------------------------------------------------- */
import "../pages/index.css";
import Card from "../components/Card.js";
import { settings } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirmation from "../components/PopupConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

/* ------------------------------------------------- */
/*                        API
/* ------------------------------------------------- */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  token: "29a0771b-e289-443d-a8da-6cea882e108e",
});

console.log("Before API Call");

//api.removeCard("6722c929c26271001a13b2ce").then((res) => console.log(res));

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

api.getUserInfo().then((userData) => {
  //console.log("User Data from API:", userData);
  userInfo.setUserInfo({
    name: userData.name,
    job: userData.about,
  });
});

// /* ------------------------------------------------- */
// /*                 Profile Edit
/* ------------------------------------------------- */

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formValues) => {
    api.getUserInfo().then((userData) => {
      //console.log("User Data from API:", userData);
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
      });
    });
    userInfo.setUserInfo({
      name: formValues.title,
      job: formValues.description,
    });

    //setting/updating the user info to the server -- need to do this so server can update user info

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
/*                 Adding Cards  
/* ------------------------------------------------- */
const addCardFormPopup = new PopupWithForm(
  "#profile-add-modal",
  (formValues) => {
    const cardData = {
      name: formValues.title,
      link: formValues.link,
    };

    api
      .addCard(cardData)
      .then((cardData) => {
        //console.log("Card added:", cardData);
        section.renderer(cardData);
      })
      .catch((error) => {
        console.error("Error adding card:", error);
      });

    const formName = addCardFormPopup.getForm().getAttribute("name");
    const validator = formValidators[formName];

    addCardFormPopup.close();
    validator.disableButton();
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
/*                 Rendering Cards 
/* ------------------------------------------------- */
function createCard(item) {
  //console.log("Item data:", item);
  const cardElement = new Card(
    item,
    "#card-form",
    handleImageClick,
    handleDeleteClick,
    confirmPopup
  );
  return cardElement.createCard();
}

const confirmPopup = new PopupConfirmation("#delete-confirm-modal");

function handleDeleteClick(cardId, cardElement) {
  console.log("Deleting card with ID:", cardId);
  api
    .removeCard(cardId)
    .then(() => {
      console.log("Card successfully deleted from server");
      cardElement.remove();
      confirmPopup.close();
      console.log("Popup should close now");
    })
    .catch((err) => console.error("Failed to delete card:", err));
}

confirmPopup.setSubmitAction(() => {
  console.log("Yes button clicked - confirming delete");
  handleDeleteClick(confirmPopup.cardId, confirmPopup.cardElement);
});

let section;
api
  .getInitialCards()
  .then((initialCards) => {
    const renderer = (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    };

    section = new Section({ items: initialCards, renderer }, ".card__list");
    section.renderItems();
    console.log("Cards:", initialCards);
  })
  .catch((error) => {
    console.error("Error fetching cards:", error);
  });

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
