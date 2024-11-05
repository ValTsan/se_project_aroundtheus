class Card {
  constructor(
    { name, link, _id },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    confirmPopup
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    //console.log("Card ID: Constructor parameter:", this._id);
    this._cardSelector = cardSelector;
    this._confirmPopup = confirmPopup;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
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

    if (this._likeButton) {
      this._likeButton.addEventListener("click", () => {
        this._handleLikeButton();
      });
    }

    if (this._cardImage) {
      this._cardImage.addEventListener("click", () => {
        this._handleImageClick(this._link, this._name);
      });
    }

    if (this._trashButton) {
      this._trashButton.addEventListener("click", () => {
        const cardId = this._getID();
        console.log("Opening confirm popup for ID:", cardId);
        console.log("Card element:", this._element);
        this._confirmPopup.open(
          (this._id, this._element)

          // => this._handleDeleteButton()
        );
      });
    }
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    const cardId = this._getID();
    console.log("Deleting Card ID:", cardId);
    this._handleDeleteClick(this._getID(), this._element);
    //this._handleDeleteClick(this.getID, this._element);
    // this._api
    //   .removeCard(this.getID())
    //   .then(() => {
    // this._element.remove();
    // this._element = null;
    // })
    //.catch((err) => console.error("Error deleting card:", err));
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
