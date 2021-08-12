export const enableValidation = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__input-error_visible',
	inputError: '.popup__input-error',
};
// Создание классов
export class FormValidator {
	constructor(popupElements, popupForm) {
		this._form = popupForm;
		this._formSelector = popupElements.formSelector;
		this._inputSelector = popupElements.inputSelector;
		this._submitButtonSelector = popupElements.submitButtonSelector;
		this._inputErrorClass = popupElements.inputErrorClass;
		this._inactiveButtonClass = popupElements.inactiveButtonClass;
		this._errorClass = popupElements.errorClass;
		this._inputError = popupElements.inputError;
		this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
	}
	// Скрыть/Отображение сообщения об ошибке
	_showInputError(inputElement) {
		this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
		inputElement.classList.add(this._inputErrorClass);
		this._errorElement.classList.add(this._errorClass);
		this._errorElement.textContent = this._element.validationMessage;
	}
	_hideInputError(inputElement) {
		this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
		inputElement.classList.remove(this._inputErrorClass);
		this._errorElement.classList.remove(this._errorClass);
		this._errorElement.textContent = "";
	}
	// Проверка импутов и формы на валидность
	_isValid(inputElement) {
		this._element = inputElement;
		!this._element.validity.valid ? this._showInputError(inputElement) : this._hideInputError(inputElement);
	}
	_hasInvalidInput() {
		return this._inputs.some((inputElement) => {
			return !inputElement.validity.valid;
		});
	}
	// Переключение кнопок
	_toggleButtonState() {
		this._buttonElement.setAttribute("disabled", true);
		this._buttonElement.classList.add(this._inactiveButtonClass);
	}
	// Переключение кнопок
	toggleSubmit() {
		if (this._hasInvalidInput()) {
			this._toggleButtonState();
		} else {
			this._buttonElement.removeAttribute("disabled", true);
			this._buttonElement.classList.remove(this._inactiveButtonClass);
		}
	}
	// Установка слушателей
	_setEventListeners() {
		this._buttonElement = this._form.querySelector(this._submitButtonSelector);
		this._inputs.forEach((inputElement) => {
			inputElement.addEventListener("input", () => {
				this._isValid(inputElement);
				this.toggleSubmit()
			});
		});
	}
	// Валидация форм
	enableValidation() {
		this._setEventListeners();
		this._form.addEventListener("submit", (evt) =>
			evt.preventDefault(),
			this.toggleSubmit(),
		);
	}
	//удалить все ошибки
	hideAllErrors() {
		this._inputs.forEach((inputElement) => {
			this._hideInputError(inputElement)
		});
		//пришлось сильно подумать! Но оказывается все проще, чем думается)))
		this._toggleButtonState();
	};
}