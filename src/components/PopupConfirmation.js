import Popup from "./Popup";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super({ popupSelector });
    this._handleConfirmation = handleConfirmation;
    //this._handleFormSubmit = handleFormSubmit;
    this._confirmButton = document.querySelector("#confirmation-modal-button");
    //console.log("Confirm button:", this._confirmButton);
    this._setEventListeners();
  }

  //   _getID() {
  //     console.log("Getting ID in PopupConfirmation Class:", this._id);
  //     return this._id;
  //   }

  open(cardId, cardElement) {
    super.open();
    // console.log("Card ID in Card class:", this._getID());
    // console.log("Card Element in Card class:", this.element);
    //this._confirmPopup.open(this._getID(), this.element);
    this.cardId = cardId;
    console.log(
      "Opening confirm popup for ID in POPUPCONFIRMATION CLASS:",
      this.cardId
    );
    this.cardElement = cardElement;
    console.log(
      "Received cardElement in POPUPCONFIRMATION CLASS:",
      cardElement
    );
  }

  close() {
    super.close();
    console.log("Closing popup...");
  }

  setSubmitAction(action) {
    // confirmPopup.setSubmitAction(() => {
    //   _handleDeleteButton();
    // });
    this._handleFormSubmit = action;
  }

  _setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      if (this._handleFormSubmit) this._handleFormSubmit();
      this.close();
    });
  }
}
