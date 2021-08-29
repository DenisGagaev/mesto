//конструктор создаёт карточку с текстом и ссылкой на изображение
export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._text = data.text;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content.cloneNode(true);
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
      .addEventListener("click", (evt) => {
        this._toggleLike(evt);
      });
    this._element
      .querySelector(".elements__delete")
      .addEventListener('click', evt => {
        this._deleteFotoCard(evt);
      });
    this._element
      .querySelector(".element__image")
      .addEventListener("click", this._handleCardClick);
  };

  _toggleLike(evt) {
    evt.target.classList.toggle('element__like_active');
  };

  _deleteFotoCard(evt) {
    evt.target.closest('.element').remove();
  }
};