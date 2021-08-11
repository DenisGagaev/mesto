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
		this._errors = Array.from(this._form.querySelectorAll(this._inputError));
	}
	// Скрыть/Отображение сообщения об ошибке
	_showInputError() {
		this._element.classList.add(this._inputErrorClass);
		this._errorElement.classList.add(this._errorClass);
		this._errorElement.textContent = this._element.validationMessage;
	}
	_hideInputError() {
		this._element.classList.remove(this._inputErrorClass);
		this._errorElement.classList.remove(this._errorClass);
		this._errorElement.textContent = "";
	}
	// Проверка импутов и формы на валидность
	_isValid(element) {
		this._element = element;
		this._errorElement = this._form.querySelector(`#${this._element.id}-error`);
		!this._element.validity.valid ? this._showInputError() : this._hideInputError();
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
		this._inputs.forEach((element) => {
			element.addEventListener("input", () => {
				this._isValid(element);
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
		this._errors.forEach((item) => {
			item.textContent = "";
			item.classList.remove(this._errorClass);
		});
		this._inputs.forEach((input) => {
			input.classList.remove(this._inputErrorClass);
		});
		// я конечно еще подумаю, но мне кажется у _hideInputError 2 параметра.
		this._toggleButtonState();
	};
}
