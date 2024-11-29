import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imageElement = this._popupElement.querySelector(
      ".modal__preview-image"
    );

    this._captionElement = this._popupElement.querySelector(
      ".modal__preview-caption"
    );
  }
  open({ name, link }) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;

    super.open();
  }
}
