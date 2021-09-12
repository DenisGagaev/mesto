export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupOverlay = this._popupSelector.querySelector(
      ".popup__overlay");
    this._closePopup = this._popupSelector.querySelector(
      ".popup__close"
    );
    this._handleEscClose = this._handleEscClose.bind(this);
    this._classOpenedPopup = "popup_opened"
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popupSelector.classList.add(this._classOpenedPopup);
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupSelector.classList.remove(this._classOpenedPopup);
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
      if (this._popupSelector.classList.contains(this._classOpenedPopup)) {
        this.close();
      }
    });
  }
}