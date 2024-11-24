class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    confirmPopup,
    handleLikeCard,
    handleUnlikeCard
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._confirmPopup = confirmPopup;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeCard = handleLikeCard;
    this._handleUnlikeCard = handleUnlikeCard;
  }

  _getID() {
    console.log("Getting ID:", this._id);
    return this._id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._trashButton = this._element.querySelector(".card__delete-button");

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    if (this._likeButton) {
      this._likeButton.addEventListener("click", () => {
        this._handleLikeCard(this._getID(), this._likeButton);
      });
    }

    if (this._trashButton) {
      this._trashButton.addEventListener("click", () => {
        const cardId = this._getID();
        console.log("Trash Button: Opening confirm popup for ID:", cardId);
        console.log("Trash Button: Card element:", this._element);
        this._confirmPopup.open(this._id, this._element);
      });
    }
  }

  _handleLikeCard() {
    console.log(`Liking card with ID: ${this._getID}`);
    api
      .likeCard(this._getID())
      .then(() => this._likeButton.classList.add("card__like-button_active"));
    api
      .getCardById(this._id)
      .then((updatedCardData) => {
        console.log("Fetched updated card data:", updatedCardData);
      })
      .catch((err) => console.error("Error liking card:", err));
  }

  _handleUnlikeCard() {
    console.log(`Unliking card with ID: ${this._getID}`);
    api
      .dislikeCard(this._getID())
      .then(() => this._likeButton.classList.remove("card__like-button_active"))
      .catch((err) => console.error("Error unliking card:", err));
  }

  _handleDeleteButton() {
    console.log("Deleting Card ID:", this._getID());
    this._handleDeleteClick(this._getID(), this._element);
  }

  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__title").textContent = this._name;
    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleImageClick(this._link, this._name);
    });

    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._setEventListeners();

    return this._element;
  }
  $;
}
export default Card;
