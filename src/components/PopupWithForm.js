import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._submitButton = this._popupForm.querySelector(".modal__button");

    this._defaultSubmitBtnText = this._submitButton.textContent;
    this.setEventListeners();
  }

  getForm() {
    return this._popupForm;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    //console.log("Captured form values:", formValues);
    return formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();

      console.log(
        "Button text before renderLoading:",
        this._submitButton.textContent
      );

      this.renderLoading(true);
      console.log(
        "Button text after renderLoading:",
        this._submitButton.textContent
      );

      this._handleFormSubmit(this._getInputValues())
        .then(() => {
          this.close();
        })
        .catch((error) => {
          console.error("Error during form submission:", error);
        })
        .finally(() => {
          console.log("Resetting button text in finally block...");
          this.renderLoading(false);
        });
    });

    super.setEventListeners();
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
