import { Card } from "./Card.js";
import { FormValidator, enableValidation } from "./FormValidator.js"
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import '../pages/index.css';
import Api from "./Api.js"
import PopupDeleteCard from "./popupDeleteCard.js";
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
  popupAvatar,
  popupDelete
} from "./constants.js";

//Api
const api = new Api({
  serverUrl: "https://mesto.nomoreparties.co/v1/cohort-27/",
  token: "8747a9a0-014b-48d6-8e47-516b00c90197"
});
// переменные для API
let userId;
let addCardLike;
let deleteCardLike;

const initialData = [api.getUserInfo(), api.getInitialCards()]

// Валидация
const editPopupValidation = new FormValidator(enableValidation, popupProfile);
const addPopupValidation = new FormValidator(enableValidation, popupCard);
const avatarPopupValidation = new FormValidator(enableValidation, popupAvatar);
editPopupValidation.enableValidation();
addPopupValidation.enableValidation();
avatarPopupValidation.enableValidation();

const addLoading = (evt) => {
  evt.textContent = "Сохранение...";
}
const removeLoading = (evt) => {
  evt.textContent = "Сохранить";
}
const removeLoadingCard = (evt) => {
  evt.textContent = "Создать";
}

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

//функия удаления
const deleteCard = (data) => {
  deleteCardPopup.data = data;
  deleteCardPopup.open();
};

// Генерация карточек
const createCard = (data) => {
  const card = new Card(
    data,
    "#cardTemplate",
    userId,
    openImagePopup,
    deleteCard,
    (addCardLike = (data) => {
      return api.addCardLike(data);
    }),
    (deleteCardLike = (data) => {
      return api.deleteCardLike(data);
    })
  );
  const cardElement = card.generateCard(data);
  return cardElement;
};
const deleteCardPopup = new PopupDeleteCard(popupDelete, {
  formSubmitCallBack: (data) => {
    api
      .deleteCard(data.cardId)
      .then(() => {
        deleteCardPopup.close();
      })
      .catch((err) => console.log(err));
  },
});
deleteCardPopup.setEventListeners();

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
  formSubmitCallBack: (data, button) => {
    addLoading(button)
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
      .finally(() => {
        removeLoading(button)
      });
  },
});
addNewCardPopup.setEventListeners();

// Попап редактирования профиля
const userInfo = new UserInfo({ profileName, profileText, profileAvatar });

const editPopup = new PopupWithForm(popupProfile, {
  formSubmitCallBack: (data, button) => {
    addLoading(button)
    api
      .editProfile(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        editPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        removeLoadingCard(button)
      });
  },
});
editPopup.setEventListeners();

// Замена аватарки
const editAvatarProfile = new PopupWithForm(popupAvatar, {
  formSubmitCallBack: (data, button) => {
    addLoading(button)
    api
      .editAvatar(data)
      .then((res) => {
        userInfo.setAvatarInfo(res);
        editAvatarProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        removeLoading(button)
      });
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