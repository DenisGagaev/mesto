export default class Popup {
	constructor(popupSelector) {
		this._popupSelector = popupSelector;
		this._popupOverlay = this._popupSelector.querySelector(
			".popup__overlay");
		this._closePopup = this._popupSelector.querySelector(
			".popup__close"
		);
		this._handleEscClose = this._handleEscClose.bind(this);
		this._klassOpenedPopup = "popup_opened"
	}

	open() {
		document.addEventListener('keydown', this._handleEscClose);
		this._popupSelector.classList.add(this._klassOpenedPopup);
	}

	close() {
		document.removeEventListener('keydown', this._handleEscClose);
		this._popupSelector.classList.remove(this._klassOpenedPopup);
	}

	_handleEscClose(evt) {
		if (evt.key === "Escape") {
			this.close();
		}
	}

	setEventListeners() {
		this._closePopup.addEventListener("click", () => {
			this.close();
		});
		this._popupOverlay.addEventListener("click", () => {
			if (this._popupSelector.classList.contains(this._klassOpenedPopup)) {
				this.close();
			}
		});
	}
}