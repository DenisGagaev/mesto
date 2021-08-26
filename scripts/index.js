import { initialCards } from "./initial-сards.js";
import { Card } from "./Card.js";
import { FormValidator, enableValidation } from "./FormValidator.js"
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";

const formElementProfile = document.querySelector('#popup__form-profile')
const popupProfile = document.querySelector('#popup__Profile');
const popupCard = document.querySelector('#popup__card');
const popupImage = document.querySelector('#popap__image');
const inputNameProfile = formElementProfile.querySelector("#popup__name-input");
const inputTextProfile = formElementProfile.querySelector("#popup__text-input");
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const containerPhoto = document.querySelector('.elements');
const buttonEditProfile = document.querySelector('.profile__edit');
const buttonAddPhoto = document.querySelector('.profile__addfoto-button');

// Валидация
const editPopupValidation = new FormValidator(enableValidation, popupProfile);
const addPopupValidation = new FormValidator(enableValidation, popupCard);
editPopupValidation.enableValidation();
addPopupValidation.enableValidation();

// Открыть попап с фото
const openImagePopup = (evt) => {
  const data = {
    link: evt.target.src,
    text: evt.target
      .closest(".element")
      .querySelector(".element__text").textContent,
  };
  popupWithImage.open(data);
};
const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

// Генерация карточек
const createCard = (evt) => {
  const card = new Card(evt, "#cardTemplate", openImagePopup);
  const cardElement = card.generateCard(evt);
  return cardElement;
};

const section = new Section(
  {
    renderItems: (data) => {
      section.addItem(createCard(data));
    },
  },
  containerPhoto
);
section.renderItems(initialCards);

// Попап добавления фото
const addNewCardPopup = new PopupWithForm(popupCard, {
  formSubmitCallBack: (data) => {
    const item = {
      text: data.photoText,
      link: data.photoLink,
    };
    section.addItem(createCard(item), true);
    addNewCardPopup.close();
    console.log()
  },
});
addNewCardPopup.setEventListeners();

//* Попап редактирования профиля/
const userInfo = new UserInfo({ profileName, profileText });

const editPopup = new PopupWithForm(popupProfile, {
  formSubmitCallBack: (data) => {
    userInfo.setUserInfo(data);
    console.log()
    editPopup.close();
  },
});
editPopup.setEventListeners();

//---------Слушатели------------
buttonEditProfile.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  editPopupValidation.hideAllErrors();
  inputNameProfile.value = data.name
  inputTextProfile.value = data.text
  editPopup.open();
});
buttonAddPhoto.addEventListener("click", () => {
  addNewCardPopup.open();
  addPopupValidation.hideAllErrors();
});