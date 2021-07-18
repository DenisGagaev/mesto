const popupProfileClose = document.querySelector('#popupProfileClose');
const popupCardClose = document.querySelector('#popupCardClose');
const popapImageclose = document.querySelector('#PopapImageclose');
const popupProfile = document.querySelector('#popup__Profile');
const popupProfileInputError = Array.from(popupProfile.querySelectorAll('.popup__input-error'));
const popupProfileInput = Array.from(popupProfile.querySelectorAll('.popup__input'));
const popupCard = document.querySelector('#popup__card');
const popupCardInput = Array.from(popupCard.querySelectorAll('.popup__input'));
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
    document.addEventListener('keydown', (PressEsc));
};
const removeClassOpened = (popup) => {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', PressEsc)
};
const PressEsc = (evt) => {
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

//---------Фотокарточки-------------
//Получить данные карточки
const createCard = (elementText, elementLink) => {
    const cardsElement = cardTemplate.cloneNode(true);
    const cardsImageElement = cardsElement.querySelector('.element__image')
    const cardsTextElement = cardsElement.querySelector('.element__text')
    cardsTextElement.textContent = elementText;
    cardsImageElement.src = elementLink;
    cardsImageElement.alt = elementText;
    cardsElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    cardsElement.querySelector('.elements__delete').addEventListener('click', evt => {
        const cardDelete = evt.target.closest('.element');
        cardDelete.remove();
    });
    cardsImageElement.addEventListener('click', evt => {
        const photoLink = evt.target.src;
        const photoName = evt.target.closest('.element');
        const photoText = photoName.querySelector('.element__text').textContent;
        addClassOpened(popupImage)
        popupPhoto.src = photoLink;
        popupPhoto.alt = photoText
        popupImageSubtitle.textContent = photoText;
    });
    return cardsElement
};

//Добавить карточку в начало контейнера
const renderElement = (element, container) => {
    container.prepend(element);
};
//Выгрузка из массива
initialCards.forEach((item) => renderElement(createCard(item.text, item.link), containerPhoto));
//Добавление новых фото на страницу
formPhoto.addEventListener('submit', () => {
    const elementText = photoText.value;
    const elementLink = photoLink.value.trim();
    renderElement(createCard(elementText, elementLink), containerPhoto);
    formPhoto.reset();
    toggleButtonState(popupCardInput, popupButtonAddFoto, 'popup__button_disabled');
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
});
