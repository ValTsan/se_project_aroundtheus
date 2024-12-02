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

  getID() {
    return this._id;
  }

  getIsLiked() {
    return this._isLiked;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  toggleLike() {
    if (!this._likeButton) {
      console.error("Like Button is undefined in toggleLike!");
      return;
    }
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._trashButton = this._element.querySelector(".card__delete-button");

    if (this._cardImage) {
      this._cardImage.addEventListener("click", () => {
        this._handleImageClick(this._link, this._name);
      });
    }

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    if (this._likeButton) {
      this._likeButton.addEventListener("click", () => {
        this._handleLikeCard(this);
      });
    }

    if (this._trashButton) {
      this._trashButton.addEventListener("click", () => {
        const cardId = this.getID();
        this._confirmPopup.open(this._id, this._element);
      });
    }
  }

  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__title").textContent = this._name;

    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
  $;
}
export default Card;
