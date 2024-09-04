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

// ESC FUNCTION
function addEscListener(modal) {
  function escClose(event) {
    if (event.key === "Escape") {
      handleClose(modal);
    }
  }

  document.addEventListener("keydown", escClose);

  function handleClose(modal) {
    if (modal) {
      modal.classList.remove("modal_opened");
      document.removeEventListener("keydown", escClose);
    }
  }

  return handleClose;
}

//OVERLAY FUNCTION
function addOverlayListener(modal) {
  const overlay = modal.querySelector(".modal__overlay");
  if (overlay) {
    overlay.addEventListener("click", () => {
      closePopup(modal);
    });
  }
}

// CLOSE FUNCTION
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

// OPEN FUNCTION
function openPopup(modal) {
  modal.classList.add("modal_opened");
  if (!modal.dataset.overlayListenerAdded) {
    addOverlayListener(modal);
    modal.dataset.overlayListenerAdded = "true";
  }

  addEscListener(modal);
}

// RENDER CARD
function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

// PREVIEW IMAGE FUNCTION
function showPreview(imageSrc, imageAlt) {
  if (previewImageModal) {
    previewImageModal.src = imageSrc;
    previewImageModal.alt = imageAlt;
    previewCaption.textContent = imageAlt;

    openPopup(previewModal);
  } else {
    console.error("previewImageModal not found.");
  }
}

//CARD TEMPLATE FUNCTION
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    showPreview(cardData.link, cardData.name);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

/* ------------------------------------------------- */
/*                     Event Handlers
/* ------------------------------------------------- */

// EDIT PROFILE HANDLER
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closePopup(profileEditModal);
}

// ADD IMAGE HANDLER
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = addCardTitleInput.value;
  const link = imageLinkInput.value;
  renderCard({ name, link, cardListEl });
  e.target.reset();
  closePopup(profileAddModal);
}

/* ------------------------------------------------- */
/*                     Event Listeners
/* ------------------------------------------------- */

//PROFILE INFO ADDED
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

//FORM LISTENERS
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//ADD NEW CARD
addNewCardButton.addEventListener("click", () => openPopup(profileAddModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

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

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
