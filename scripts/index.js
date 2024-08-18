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

const profileTitle = document.querySelector(".profile__title");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const previewModal = document.querySelector("#preview-modal");

const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardTitleInput = document.querySelector("#add-card-title-input");
const imageLinkInput = document.querySelector("#image-link-input");

const cardListEl = document.querySelector(".card__list");
const cardTemplate =
  document.querySelector("#card-form").content.firstElementChild;

const profileModalCloseBtn = profileEditModal.querySelector(".modal__close");
const addModalCloseBtn = profileAddModal.querySelector(".modal__close");
const profileEditBtn = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const previewModalCloseBtn = previewModal.querySelector(".modal__close");

const previewImageModal = previewModal.querySelector(".preview__image");
const previewCaption = previewModal.querySelector(".preview__caption");

/* ------------------------------------------------- */
/*                     Functions
/* ------------------------------------------------- */
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function showPreview(imageSrc, imageAlt) {
  if (previewImageModal) {
    previewImageModal.src = imageSrc;
    previewCaption.textContent = imageAlt;

    openPopup(previewModal);
  } else {
    console.error("previewImageModal not found.");
  }
}

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
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

/* ------------------------------------------------- */
/*                     Event Listeners
/* ------------------------------------------------- */
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileModalCloseBtn.addEventListener("click", () =>
  closePopup(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addNewCardButton.addEventListener("click", () => openPopup(profileAddModal));
addModalCloseBtn.addEventListener("click", () => closePopup(profileAddModal));

previewModalCloseBtn.addEventListener("click", () => closePopup(previewModal));

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
