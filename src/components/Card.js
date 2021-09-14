//конструктор создаёт карточку с текстом и ссылкой на изображение
export class Card {
  constructor(
    data,
    cardSelector,
    userId,
    imagePopup,
    deleteCard,
    addCardLike,
    deleteCardLike
  ) {
    this._data = data; //данные о карточки
    this._cardSelector = cardSelector;
    this._userId = userId; // id профиля
    this._cardId = data._id; // id карточки
    this._cardOwnerId = data.owner._id; // id владельца карточки
    this._imagePopup = imagePopup;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".element__like");
    this._deleteButton = this._element.querySelector(".elements__delete");
    this._likeCounter = this._element.querySelector(".element__like-counter");
    this._ImageElement = this._element.querySelector(".element__image");
    this._deleteCard = deleteCard;
    this._addCardLike = addCardLike;
    this._deleteCardLike = deleteCardLike;
    this._classLikeActive = "element__like_active"
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element").cloneNode(true);
    return cardElement;
  };

  generateCard() {
    this._setEventListeners();
    const cardsTextElement = this._element.querySelector(".element__text");
    this._ImageElement.alt = this._data.name;
    this._ImageElement.src = this._data.link;
    cardsTextElement.textContent = this._data.name;
    this._likeCounter.textContent = this._data.likes.length;
    this._setIsLiked();
    return this._element;
  };

  _setEventListeners() {
    if (this._cardOwnerId === this._userId) {
      this._deleteButton.classList.add("elements__delete_active");
      this._deleteButton.addEventListener("click", () =>
        this._deleteFotoCard()
      );
    }
    this._likeButton.addEventListener("click", () => this._toggleLike());
    this._ImageElement
      .addEventListener("click", this._imagePopup);
  };

  _toggleLike() {
    if (!this._likeButton.classList.contains(this._classLikeActive)) {
      this._addCardLike(this._cardId)
        .then((res) => {
          this._data = res;
          this._likeCounter.textContent = res.likes.length;
          this._likeButton.classList.add(this._classLikeActive);
        })
        .catch((err) => console.log(err));
    } else {
      this._deleteCardLike(this._cardId)
        .then((res) => {
          this._data = res;
          this._likeCounter.textContent = res.likes.length;
          this._likeButton.classList.remove(this._classLikeActive);
        })
        .catch((err) => console.log(err));
    }
  };

  _deleteFotoCard() {
    const data = {
      card: this._element,
      cardId: this._cardId,
    };
    this._deleteCard(data);
  }

  _setIsLiked() {
    if (this._data.likes.some(elem => elem._id === this._userId)) {
      this._likeButton.classList.add(this._classLikeActive);
    }
  }
};