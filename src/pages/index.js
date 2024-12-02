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
  avatarSelector: ".profile__image",
});

api
  .getUserInfo()
  .then((userData) => {
    // console.log("Setting avatar to:", userData.avatar);
    // console.log("User Data from API:", userData);
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch((error) => {
    console.error("Error setting userInfo:", error);
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

// /* ------------------------------------------------- */
// /*                 Profile Avatar
/* ------------------------------------------------- */
const handleAvatarFormSubmit = (formData) => {
  const newAvatarUrl = formData.avatarUrl;

  return api.updateAvatar(newAvatarUrl).then((userData) => {
    console.log("Avatar updated on server:", userData.avatar);
    userInfo.setUserAvatar(userData.avatar);
  });
};

const profileEditAvatar = new PopupWithForm(
  "#update-avatar-modal",
  handleAvatarFormSubmit
);

const profileEditAvatarButton = document.querySelector(".profile__edit-icon");

profileEditAvatar.setEventListeners();

profileEditAvatarButton.addEventListener("click", () => {
  profileEditAvatar.open();
});

// /* ------------------------------------------------- */
// /*                 Profile Edit
/* ------------------------------------------------- */
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formValues) => {
    return api
      .setUserInfo({
        name: formValues.title,
        about: formValues.description,
      })
      .then((data) => {
        userInfo.setUserInfo({
          name: data.name,
          job: data.about,
          avatar: data.avatar,
        });
      });
  }
);

profileEditPopup.setEventListeners();
document.querySelector("#profile-edit-button").addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();

  profileEditPopup.setInputValues({
    title: name,
    description: job,
  });

  profileEditPopup.open();
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

    return api.addCard(cardData).then((cardData) => {
      console.log("Adding new card:", cardData);
      const cardElement = createCard(cardData);
      section.addItem(cardElement);

      const formElement = addCardFormPopup.getForm();
      formElement.reset();

      const formName = formElement.getAttribute("name");
      const validator = formValidators[formName];
      validator.disableButton();
    });
  },
  "Creating..."
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
  const cardElement = new Card(
    item,
    "#card-form",
    handleImageClick,
    handleDeleteClick,
    confirmPopup,
    handleLikeCard
  );

  return cardElement.createCard();
}

//Handle Delete Card
function handleDeleteClick(cardId, cardElement) {
  return api.removeCard(cardId).then(() => {
    cardElement.remove();
  });
}

const confirmPopup = new PopupConfirmation("#delete-confirm-modal");
confirmPopup.setEventListeners();

confirmPopup.setSubmitAction(() => {
  console.log(
    "Yes button clicked - confirming delete",
    confirmPopup.cardId,
    confirmPopup.cardElement
  );
  return handleDeleteClick(confirmPopup.cardId, confirmPopup.cardElement);
});

//Handle Like Card
function handleLikeCard(card) {
  const isLiked = card.getIsLiked();
  const apiCall = isLiked
    ? api.dislikeCard(card.getID())
    : api.likeCard(card.getID());

  apiCall
    .then(() => {
      card.toggleLike();
    })
    .catch(console.error);
}

//Rendering Cards
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
