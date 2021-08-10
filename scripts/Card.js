import { addClassOpened, popupPhoto, popupImageSubtitle, popupImage } from "./index.js";
//конструктор создаёт карточку с текстом и ссылкой на изображение
export class Card {
  constructor(data, cardSelector) {
    this._text = data.text;
    this._link = data.link;
    this._cardSelector = cardSelector;
  };

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    const cardsImageElement = this._element.querySelector(".element__image");
    const cardsTextElement = this._element.querySelector(".element__text");
    cardsImageElement.src = this._link
    cardsImageElement.alt = this._text;
    cardsTextElement.textContent = this._text;
    this._setEventListeners();
    return this._element;
  };

  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle('element__like_active');
      });
    this._element
      .querySelector(".elements__delete")
      .addEventListener('click', evt => {
        evt.target.closest('.element').remove();
      });
    this._element.querySelector(".element__image")
      .addEventListener("click", () => {
        this._pictureClick();
      });
  };

  _pictureClick() {
    addClassOpened(popupImage);
    popupPhoto.src = this._link;
    popupPhoto.alt = this._text;
    popupImageSubtitle.textContent = this._text;
  }
};