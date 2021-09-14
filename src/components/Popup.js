export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupOverlay = this._popup.querySelector(
      ".popup__overlay");
    this._closePopup = this._popup.querySelector(
      ".popup__close"
    );
    this._handleEscClose = this._handleEscClose.bind(this);
    this._classOpenedPopup = "popup_opened"
  }

  get popup() {
    return this._popup;
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add(this._classOpenedPopup);
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove(this._classOpenedPopup);
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
      if (this._popup.classList.contains(this._classOpenedPopup)) {
        this.close();
      }
    });
  }
}