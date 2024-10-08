class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    //console.log("Card link:", this._link);

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    // console.log(
    //   "Card selector template:",
    //   document.querySelector(this._cardSelector)
    // );
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._cardImage = this._element.querySelector(".card__image");
    // console.log(this._cardImage);
    this._trashButton = this._element.querySelector(".card__trash-button");

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._link, this._name);
    });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._trashButton.remove();
    this._element = null;
  }

  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__title").textContent = this._name;
    const cardImage = this._element.querySelector(".card__image");
    //console.log(this._cardImage);
    cardImage.src = this._link;
    cardImage.alt = this._name;
    //console.log("Card image src set:", cardImage.src);
    //console.log(this._link);
    // console.log(cardImage);
    // console.log(cardImage.src);
    // console.log("Card image element:", cardImage);
    // console.log("Card image src after setting:", cardImage.src);

    this._setEventListeners();

    return this._element;
  }
  $;
}
export default Card;
