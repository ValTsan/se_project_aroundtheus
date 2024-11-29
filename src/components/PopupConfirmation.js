import Popup from "./Popup";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector, handleConfirmation, handleFormSubmit) {
    super({ popupSelector });
    this._handleConfirmation = handleConfirmation;
    this._handleFormSubmit = handleFormSubmit;
    this._confirmButton = document.querySelector("#confirmation-modal-button");
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._defaultSubmitBtnText = this._submitButton.textContent;
    this._setEventListeners();
  }

  _getID() {
    console.log("Getting ID in PopupConfirmation Class:", this._id);
    return this._id;
  }

  open(cardId, cardElement) {
    super.open();
    this.cardId = cardId;
    console.log("Opening confirm popup for ID in PopConfirmation.js:");
    this.cardElement = cardElement;
    console.log("Received cardElement in PopConfirmation.js:", cardElement);
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  _setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      if (this._handleFormSubmit) this._handleFormSubmit();
    });
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    console.log("renderLoading called. isLoading:", isLoading);
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._defaultSubmitBtnText;
    }
  }
}
