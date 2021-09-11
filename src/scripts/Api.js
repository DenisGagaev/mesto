export default class Api {
	constructor(data) {
		this._baseUrl = data.serverUrl; //url сервера
		this._token = data.token; //токен пользователя
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
}