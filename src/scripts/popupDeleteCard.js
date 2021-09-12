import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, { formSubmitCallBack }) {
    super(popupSelector);
    this._formSubmitCallBack = formSubmitCallBack;
    this._form = this._popupSelector.querySelector(".popup__form");
    this._submit = this._submit.bind(this);
  }

  _submit(evt) {
    evt.preventDefault();
    this._formSubmitCallBack(this.data);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submit)
  }

  
}