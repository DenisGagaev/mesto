const popupProfileClose = document.querySelector('#popupProfileClose')
const popupCardClose = document.querySelector('#popupCardClose')
const popapImageclose = document.querySelector('#PopapImageclose')
const popupProfile = document.querySelector('#popup__Profile')
const popupCard = document.querySelector('#popup__card')
const popupImage = document.querySelector('#popap__image')
const buttonEditProfile = document.querySelector('.profile__edit');
const formElementProfile = document.querySelector('#popup__form-profile')
const InputNameProfile = formElementProfile.querySelector("input[name='profileName']");
const InputTextProfile = formElementProfile.querySelector("input[name='profileText']");
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

// функция открытия-закрытия попапов
const addClassOpened = (popup) => { popup.classList.add('popup_opened') }
const removeClassOpened = (popup) => { popup.classList.remove('popup_opened') }

//Функции работы с профилем
buttonEditProfile.addEventListener('click', () => {
    addClassOpened(popupProfile)
    InputNameProfile.value = profileName.textContent
    InputTextProfile.value = profileText.textContent
});
formElementProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = InputNameProfile.value
    profileText.textContent = InputTextProfile.value
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
const setEventListeners = (element) => {
    const like = element.querySelector('.element__like')
    const remove = element.querySelector('.elements__delete')
    const image = element.querySelector('.element__image')
    remove.addEventListener('click', removeElement);
    like.addEventListener('click', function () { (toggleLike(like)) })
    image.addEventListener('click', openPopupFoto)
};
//Добавить карточку в начало контейнера
const renderElement = (element, container) => {
    setEventListeners(element);
    container.prepend(element);
};
//Выгрузка из массива
initialCards.forEach((item) => renderElement(createCard(item.text, item.link), containerPhoto));
//Добавление новых фото на страницу
formPhoto.addEventListener('submit', evt => {
    evt.preventDefault();
    const elementText = photoText.value;
    const elementLink = photoLink.value.trim();
    renderElement(createCard(elementText, elementLink), containerPhoto);
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
    popupCard.classList.toggle('popup_opened');
});
