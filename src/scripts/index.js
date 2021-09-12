import { Card } from "./Card.js";
import { FormValidator, enableValidation } from "./FormValidator.js"
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import '../pages/index.css';
import Api from "./Api.js"
import {
  popupProfile,
  popupCard,
  popupImage,
  inputNameProfile,
  inputTextProfile,
  profileName,
  profileText,
  profileAvatar,
  editAvatar,
  containerPhoto,
  buttonEditProfile,
  buttonAddPhoto,
  popupAvatar
} from "./constants.js";

//Api
const api = new Api({
  serverUrl: "https://mesto.nomoreparties.co/v1/cohort-27/",
  token: "8747a9a0-014b-48d6-8e47-516b00c90197"
});

let userId;

const initialData = [api.getUserInfo(), api.getInitialCards()]

// Валидация
const editPopupValidation = new FormValidator(enableValidation, popupProfile);
const addPopupValidation = new FormValidator(enableValidation, popupCard);
const avatarPopupValidation = new FormValidator(enableValidation, popupAvatar);
editPopupValidation.enableValidation();
addPopupValidation.enableValidation();
avatarPopupValidation.enableValidation();

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

// Попап добавления фото
const addNewCardPopup = new PopupWithForm(popupCard, {
  formSubmitCallBack: (data) => {
    const item = {
      name: data.photoText,
      link: data.photoLink,
    };
    api
      .sendCard(item)
      .then((res) => {
        section.addItem(createCard(res), true);
        addNewCardPopup.close();
      })
      .catch((err) => console.log(err))
  },
});
addNewCardPopup.setEventListeners();

// Попап редактирования профиля
const userInfo = new UserInfo({ profileName, profileText, profileAvatar });

const editPopup = new PopupWithForm(popupProfile, {
  formSubmitCallBack: (data) => {
    api
      .editProfile(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        editPopup.close();
      })
      .catch((err) => console.log(err))
  },
});
editPopup.setEventListeners();

//Замена аватарки
const editAvatarProfile = new PopupWithForm(popupAvatar, {
  formSubmitCallBack: (data) => {
    api
      .editAvatar(data)
      .then((res) => {
        userInfo.setAvatarInfo(res);
        editAvatarProfile.close();
      })
      .catch((err) => console.log(err))
  },
});
editAvatarProfile.setEventListeners();

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
editAvatar.addEventListener("click", () => {
  editAvatarProfile.open();
  avatarPopupValidation.enableValidation();
})
//данные с сервера для мзначальной отрисовки
Promise.all(initialData)
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setAvatarInfo(userData);
    section.renderItems(cards.reverse());
  })
  .catch((err) => console.log(err));