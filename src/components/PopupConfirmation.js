import Popup from "./Popup";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector, handleConfirmation, handleFormSubmit) {
    super({ popupSelector });
    this._handleConfirmation = handleConfirmation;
    this._handleFormSubmit = handleFormSubmit;
    this._confirmButton = document.querySelector("#confirmation-modal-button");
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._defaultSubmitBtnText = this._submitButton.textContent;
    this.setEventListeners();
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

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", () => {
      console.log("this._handleFormSubmit:", this._handleFormSubmit);
      if (this._handleFormSubmit) {
        this.renderLoading(true, "Deleting...");
        this._handleFormSubmit()
          .then(() => {
            this.close();
          })
          .catch((err) => {
            console.error("Error during delete operation:", err);
          })
          .finally(() => {
            this.renderLoading(false);
          });
      } else {
        console.error("_handleFormSubmit is undefined");
      }
    });
  }

  renderLoading(isLoading, loadingText = "Deleting...") {
    console.log("renderLoading called. isLoading:", isLoading);
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._defaultSubmitBtnText;
    }
  }
}
