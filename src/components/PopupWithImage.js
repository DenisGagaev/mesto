import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageElement = super.popup.querySelector(
      ".popup__photo");
    this._popupImageSubtitle = super.popup.querySelector(
      ".popup__image-subtitle");
  }

  open({ text, link }) {
    this._imageElement.src = link;
    this._imageElement.alt = text;
    this._popupImageSubtitle.textContent = text;
    super.open();
  }
}