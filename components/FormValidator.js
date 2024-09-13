class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );

    this._submitButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }

  //ENABLE VALIDATION
  enableValidation() {
    this._setEventListeners();
  }

  //EVENT LISTENERS INPUT AND BUTTON STATE
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //CHECK INPUT VALIDITY
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //SHOW INPUT ERROR MESSAGE
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  //HIDE ERROR MESSAGE
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  }

  //CHECK INVALID INPUT
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  //TOGGLE STATE BUTTON (GREYED OUT OR NOT)
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  //RESET VALIDATION FORM
  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //DISBALED SUMBIT BUTTON (AFTER SUBMISISON)
  disableButtonAfterSubmit() {
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.disabled = true;
  }
}

export default FormValidator;
