import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);

		this._imageElement = this._popupSelector.querySelector(
			".popup__photo");
		this._popupImageSubtitle = this._popupSelector.querySelector(
			".popup__image-subtitle");
	}

	open({ text, link }) {
		this._imageElement.src = link;
		this._imageElement.alt = text;
		this._popupImageSubtitle.textContent = text;
		super.open();
	}
}