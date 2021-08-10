import { initialCards } from "./initial-сards.js";
import { Card } from "./Card.js";
import { FormValidator, enableValidation } from "./FormValidator.js"

const popupProfileClose = document.querySelector('#popupProfileClose');
const popupCardClose = document.querySelector('#popupCardClose');
const popapImageclose = document.querySelector('#PopapImageclose');
const popupProfile = document.querySelector('#popup__Profile');
const popupProfileInputError = Array.from(popupProfile.querySelectorAll('.popup__input-error'));
const popupProfileInput = Array.from(popupProfile.querySelectorAll('.popup__input'));
const popupCard = document.querySelector('#popup__card');
const popupImage = document.querySelector('#popap__image');
const buttonEditProfile = document.querySelector('.profile__edit');
const formElementProfile = document.querySelector('#popup__form-profile')
const inputNameProfile = formElementProfile.querySelector("input[name='profileName']");
const inputTextProfile = formElementProfile.querySelector("input[name='profileText']");
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const containerPhoto = document.querySelector('.elements');
const popupPhoto = document.querySelector('.popup__photo');
const formPhoto = document.querySelector('#popup__form-photo');
const photoText = formPhoto.querySelector("input[name='photoText']");
const photoLink = formPhoto.querySelector("input[name='photoLink']");
const popupImageSubtitle = document.querySelector('.popup__image-subtitle');
const buttonAddPhoto = document.querySelector('.profile__addfoto-button');

//Валидация
const editPopupValidation = new FormValidator(enableValidation, popupProfile);
const addPopupValidation = new FormValidator(enableValidation, popupCard);
editPopupValidation.enableValidation();
addPopupValidation.enableValidation();

// функция открытия-закрытия попапов
const addClassOpened = (popup) => {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', (pressEsc));
};
const removeClassOpened = (popup) => {
	popup.classList.remove('popup_opened')
	document.removeEventListener('keydown', pressEsc)
};
const pressEsc = (evt) => {
	const popupActive = document.querySelector('.popup_opened')
	if (evt.key === "Escape") {
		removeClassOpened(popupActive)
		deleteErrorFormProfile()
	};
};
//-------Закрыть попап по Оверлею-------
const closePopupOverlay = () => {
	const popupActive = document.querySelector('.popup_opened')
	removeClassOpened(popupActive)
	deleteErrorFormProfile()
};
const popupOverlay = Array.from(document.querySelectorAll('.popup__overlay'));
const findAndClosePopup = popupOverlay.forEach((item) => {
	item.addEventListener('click', (closePopupOverlay))
});

//--Функия удаления ошибки попапа профиля
const deleteErrorFormProfile = () => {
	popupProfileInputError.forEach((item) => {
		item.textContent = '';
		item.classList.remove('popup__input-error_visible');
	})
	popupProfileInput.forEach((item) => {
		item.classList.remove('popup__input_type_error');
	})
};

//Функции работы с профилем
buttonEditProfile.addEventListener('click', () => {
	addClassOpened(popupProfile)
	inputNameProfile.value = profileName.textContent
	inputTextProfile.value = profileText.textContent
});
formElementProfile.addEventListener('submit', () => {
	profileName.textContent = inputNameProfile.value
	profileText.textContent = inputTextProfile.value
	removeClassOpened(popupProfile)
});

//Добавить фотокарточку в начало контейнера
initialCards.forEach((item) => {
	const card = new Card(item, "#cardTemplate");
	const cardExample = card.generateCard();
	containerPhoto.prepend(cardExample);
});

//Добавление новых фото на страницу
formPhoto.addEventListener("submit", () => {
	const newCard = {
		text: photoText.value,
		link: photoLink.value.trim(),
	};
	const addCard = new Card(newCard, "#cardTemplate");
	const cardElement = addCard.generateCard();
	containerPhoto.prepend(cardElement);
	formPhoto.reset();
	removeClassOpened(popupCard)
});

//---------Слушатели------------
popupProfileClose.addEventListener('click', () => {
	removeClassOpened(popupProfile, deleteErrorFormProfile())
});
popupCardClose.addEventListener('click', () => {
	removeClassOpened(popupCard)
});
popapImageclose.addEventListener('click', () => {
	removeClassOpened(popupImage)
});
buttonAddPhoto.addEventListener('click', () => {
	addClassOpened(popupCard)
	addPopupValidation.toggleSubmit();//не уверен на сколько это правильно, но по другому не придумал("но по другому не заработало"=) ). 
});

export { addClassOpened, popupPhoto, popupImageSubtitle, popupImage }