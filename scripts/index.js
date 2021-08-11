import { initialCards } from "./initial-сards.js";
import { Card } from "./Card.js";
import { FormValidator, enableValidation } from "./FormValidator.js"

const formElementProfile = document.querySelector('#popup__form-profile')
const formPhoto = document.querySelector('#popup__form-photo');
const popupProfileClose = document.querySelector('#popupProfileClose');
const popupCardClose = document.querySelector('#popupCardClose');
const popapImageclose = document.querySelector('#PopapImageclose');
const popupProfile = document.querySelector('#popup__Profile');
const popupCard = document.querySelector('#popup__card');
const popupImage = document.querySelector('#popap__image');
const inputNameProfile = formElementProfile.querySelector("input[name='profileName']");
const inputTextProfile = formElementProfile.querySelector("input[name='profileText']");
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const containerPhoto = document.querySelector('.elements');
const popupPhoto = document.querySelector('.popup__photo');
const inputPhotoText = formPhoto.querySelector("input[name='photoText']");
const inputPhotoLink = formPhoto.querySelector("input[name='photoLink']");
const popupImageSubtitle = document.querySelector('.popup__image-subtitle');
const buttonEditProfile = document.querySelector('.profile__edit');
const buttonAddPhoto = document.querySelector('.profile__addfoto-button');

//Валидация
const editPopupValidation = new FormValidator(enableValidation, popupProfile);
const addPopupValidation = new FormValidator(enableValidation, popupCard);
editPopupValidation.enableValidation();
addPopupValidation.enableValidation();

// функция открытия-закрытия попапов
const addClassOpened = (popup) => {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', pressEsc);
};
const removeClassOpened = (popup) => {
	popup.classList.remove('popup_opened')
	document.removeEventListener('keydown', pressEsc)
};
const pressEsc = (evt) => {
	const popupActive = document.querySelector('.popup_opened')
	if (evt.key === "Escape") {
		removeClassOpened(popupActive)
	};
};
//-------Закрыть попап по Оверлею-------
const closePopupOverlay = () => {
	const popupActive = document.querySelector('.popup_opened')
	removeClassOpened(popupActive)
};
const popupOverlay = Array.from(document.querySelectorAll('.popup__overlay'));
popupOverlay.forEach((item) => {
	item.addEventListener('click', (closePopupOverlay))
});

//Функции работы с профилем
buttonEditProfile.addEventListener('click', () => {
	addClassOpened(popupProfile);
	editPopupValidation.hideAllErrors();
	inputNameProfile.value = profileName.textContent
	inputTextProfile.value = profileText.textContent
});
formElementProfile.addEventListener('submit', () => {
	profileName.textContent = inputNameProfile.value
	profileText.textContent = inputTextProfile.value
	removeClassOpened(popupProfile)
});

// Создать каточку
const cardElement = (evt) => {
	const card = new Card(evt, "#cardTemplate");
	const createCard = card.generateCard();
	containerPhoto.prepend(createCard);
	return card;
};
//Добавить массив фото в начало контейнера
initialCards.forEach((item) => {
	cardElement(item)
});
//Добавление новых фото на страницу
formPhoto.addEventListener("submit", () => {
	const newCard = {
		text: inputPhotoText.value,
		link: inputPhotoLink.value.trim(),
	};
	cardElement(newCard)
	formPhoto.reset();
	removeClassOpened(popupCard)
});

//---------Слушатели------------
popupProfileClose.addEventListener('click', () => {
	removeClassOpened(popupProfile)
});
popupCardClose.addEventListener('click', () => {
	removeClassOpened(popupCard)
});
popapImageclose.addEventListener('click', () => {
	removeClassOpened(popupImage)
});
buttonAddPhoto.addEventListener('click', () => {
	addClassOpened(popupCard)
	formPhoto.reset();
	addPopupValidation.hideAllErrors();
});

export { addClassOpened, popupPhoto, popupImageSubtitle, popupImage }