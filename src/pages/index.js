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
    console.log("Setting avatar to:", userData.avatar);
    console.log("User Data from API:", userData);

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
  handleAvatarFormSubmit,
  (formValues) => {
    profileEditAvatar.renderLoading(true);
    const avatarUrl = formValues.avatar;
    api
      .updateAvatar(avatarUrl)
      .then((userData) => {
        console.log("Avatar URL:", userData.avatar);
        userInfo.setUserAvatar(userData.avatar);
        profileEditAvatar.close();
      })
      .catch((err) => {
        console.error(`Error Submitting Form: ${err}`);
      });
  }
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
    profileEditPopup.renderLoading(true);
    return api
      .setUserInfo({
        name: formValues.title,
        about: formValues.description,
      })
      .then((data) => {
        userInfo.setUserAvatar(data.avatar);

        const formName = profileEditPopup.getForm().getAttribute("name");
        const validator = formValidators[formName];
        validator.disableButton();
        profileEditPopup.close();
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
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

    addCardFormPopup.renderLoading(true, "Creating...");

    return api
      .addCard(cardData)
      .then((cardData) => {
        console.log("Adding new card:", cardData);
        const cardElement = createCard(cardData);
        section.addItem(cardElement);

        const formElement = addCardFormPopup.getForm();
        formElement.reset();

        addCardFormPopup.close();

        const formName = addCardFormPopup.getForm().getAttribute("name");
        const validator = formValidators[formName];
        validator.disableButton();
      })
      .catch((error) => {
        console.error("Error adding card:", error);
      });
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
    handleLikeCard,
    handleUnlikeCard
  );

  return cardElement.createCard();
}

const confirmPopup = new PopupConfirmation("#delete-confirm-modal");
confirmPopup.setEventListeners();

function handleImageClick(link, name) {
  imagePopup.open({ name, link });
}

function handleDeleteClick(cardId, cardElement) {
  console.log("Deleting card with ID:", cardId);

  confirmPopup.renderLoading(true, "Deleting...");

  api
    .removeCard(cardId)
    .then(() => {
      console.log("Card successfully deleted from server");
      cardElement.remove();
      confirmPopup.close();
      console.log("Popup should close now");
    })
    .catch((err) => console.error("Failed to delete card:", err))
    .finally(() => {
      confirmPopup.renderLoading(false);
    });
}

confirmPopup.setSubmitAction(() => {
  console.log("Yes button clicked - confirming delete");
  handleDeleteClick(confirmPopup.cardId, confirmPopup.cardElement);
});

function handleLikeCard(card) {
  const apiCall = card.getIsLiked()
    ? api.dislikeCard(card._getId())
    : api.likeCard(card._getId());

  apiCall
    .then((updatedData) => {
      console.log("Server responded successfully:", updatedData);
      //cardInstance.toggleLike();
    })
    .catch((err) => {
      console.error(`Error ${isLiked ? "removing" : "adding"} like:`, err);
    });
}

function handleUnlikeCard(cardId) {
  return api.dislikeCard(cardId);
}

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
