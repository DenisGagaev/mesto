export default class Api {
  constructor(data) {
    this._baseUrl = data.serverUrl;
    this._token = data.token;
  }
  // проверка
  _requestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        `Хьюстон, у нас проблемы: Ошибка ${res.status} ${res.statusText}`
      );
    }
  }
  // Запрос данных пользователя
  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) =>
      this._requestResult(res)
    );
  }
  // Отправка данных пользователя
  editProfile(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name.trim(),
        about: data.about.trim()
      }),
    }).then((res) => this._requestResult(res));
  }
  // Запрос карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._requestResult(res));
  }
  // отправка данных Аватара
  editAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatarLink,
      }),
    }).then((res) => this._requestResult(res));
  }
  // отправка на сервер новой карточки
  sendCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._requestResult(res));
  }
  // Запрос на удаление карточки
  deleteCard(data) {
    return fetch(`${this._baseUrl}cards/${data}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._requestResult(res));
  }
  // Запрос на добавление лайка карточке
  addCardLike(data) {
    return fetch(`${this._baseUrl}cards/likes/${data}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._requestResult(res));
  }
  // Запрос на удаление лайка карточки
  deleteCardLike(data) {
    return fetch(`${this._baseUrl}cards/likes/${data}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._requestResult(res));
  }
}