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
const cardTemplate = document.querySelector('#cardTemplate').content;
const containerPhoto = document.querySelector('.elements');
const popupPhoto = document.querySelector('.popup__photo');
const formPhoto = document.querySelector('#popup__form-photo');
const photoText = formPhoto.querySelector("input[name='photoText']");
const photoLink = formPhoto.querySelector("input[name='photoLink']");
const popupImageSubtitle = document.querySelector('.popup__image-subtitle');
const buttonAddPhoto = document.querySelector('.profile__add-button');
const popupButtonAddFoto = popupCard.querySelector('.popup__button');

// функция открытия-закрытия попапов
const addClassOpened = (popup) => {
    popup.classList.add('popup_opened');
}
const removeClassOpened = (popup) => {
    popup.classList.remove('popup_opened')
}
//--Функия удаления ошибки попапа профиля
const deleteErrrorFormProfile = () => {
    popupProfileInputError.forEach((item) => {
        item.textContent = '';
        item.classList.remove('popup__input-error_visible');
    })
    popupProfileInput.forEach((item) => {
        item.classList.remove('popup__input_type_error');
    })
}
window.onkeydown = (evt) => {
    if (evt.keyCode == 27) {
        removeClassOpened(popupProfile, deleteErrrorFormProfile());
        removeClassOpened(popupCard);
        removeClassOpened(popupImage)
    }
};
//Функции работы с профилем
buttonEditProfile.addEventListener('click', () => {
    addClassOpened(popupProfile)
    inputNameProfile.value = profileName.textContent
    inputTextProfile.value = profileText.textContent
});
formElementProfile.addEventListener('submit', (evt) => {
    profileName.textContent = inputNameProfile.value
    profileText.textContent = inputTextProfile.value
    removeClassOpened(popupProfile)
});

//---------Фотоарточками-------------
//Получить данные карточки
const createCard = (elementText, elementLink) => {
    const cardsElement = cardTemplate.cloneNode(true);
    cardsElement.querySelector('.element__text').innerText = elementText;
    cardsElement.querySelector('.element__image').src = elementLink;
    cardsElement.querySelector('.element__image').alt = elementText;
    return cardsElement
};
//Функция удаления карточек
const removeElement = (evt) => evt.target.closest('.element').remove();
//Поставить\убрать лайк
const toggleLike = (likeButton) => { likeButton.classList.toggle('element__like_active'); }
//Функция раскрытия фото
function openPopupFoto(evt) {
    const photoLink = evt.target.src;
    const photoName = evt.target.closest('.element');
    const photoText = photoName.querySelector('.element__text').textContent;
    popupImage.classList.toggle('popup_opened')
    popupPhoto.src = photoLink;
    popupImageSubtitle.textContent = photoText;
};
// Слушатели на карточку
const setsEventListeners = (element) => {
    const like = element.querySelector('.element__like')
    const remove = element.querySelector('.elements__delete')
    const image = element.querySelector('.element__image')
    remove.addEventListener('click', removeElement);
    like.addEventListener('click', function () { (toggleLike(like)) })
    image.addEventListener('click', openPopupFoto)
};
//Добавить карточку в начало контейнера
const renderElement = (element, container) => {
    setsEventListeners(element);
    container.prepend(element);
};
//Выгрузка из массива
initialCards.forEach((item) => renderElement(createCard(item.text, item.link), containerPhoto));
//Добавление новых фото на страницу
formPhoto.addEventListener('submit', evt => {
    const elementText = photoText.value;
    const elementLink = photoLink.value.trim();
    renderElement(createCard(elementText, elementLink), containerPhoto);
    formPhoto.reset();
    removeClassOpened(popupCard)
    enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
    });
});
//---------Слушатели------------
popupProfileClose.addEventListener('click', () => {
    removeClassOpened(popupProfile, deleteErrrorFormProfile())
});
popupCardClose.addEventListener('click', () => {
    removeClassOpened(popupCard)
});
popapImageclose.addEventListener('click', () => {
    removeClassOpened(popupImage)
});
buttonAddPhoto.addEventListener('click', () => {
    popupCard.classList.toggle('popup_opened');
});
//-------Закрыть попап по Оверлею-------
const popupOverlay = Array.from(document.querySelectorAll('.popup__overlay'));
const findAndClosePopup = popupOverlay.forEach((item) => {
    item.addEventListener('click', () => {
        removeClassOpened(popupProfile, deleteErrrorFormProfile());
        removeClassOpened(popupCard);
        removeClassOpened(popupImage)
    });
});