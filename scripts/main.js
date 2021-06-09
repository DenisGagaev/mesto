//Массив с фото
const initialCards = [
    {
        text: 'Казань',
        link: './images/sasha-yudaev-kazan.jpg'
    },
    {
        text: 'Сочи',
        link: './images/dima-fedorov-sochi.jpg'
    },
    {
        text: 'Куршская Коса',
        link: './images/artem-beliaikin-kurshkaya-kosa.jpg'
    },
    {
        text: 'Владивосток',
        link: './images/pavel-anoshin-vladivostok.jpg'
    },
    {
        text: 'Санкт-Петербург',
        link: './images/matvey-yelkin-saint-petersburg.jpg'
    },
    {
        text: 'Москва',
        link: './images/nikita-karimov-lvJZhHOIJJ4-unsplash.jpg'
    }
];
//Текст профиля
const openPopup = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closePopup = popup.querySelector('#popup__close');
const formElement = document.querySelector('#popup__form-profile')
const nameInput = formElement.querySelector("input[name='profileName']");
const jobInput = formElement.querySelector("input[name='profileText']");
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const elements = document.querySelector('.elements')
//Фотокарточка
const cardTemplate = document.querySelector('#cardTemplate').content;
const addPopup = document.querySelector('#addpopup')
const addButton = document.querySelector('.profile__add-button');
const addClosePopup = document.querySelector('#addpopup__close');
const formPhoto = document.querySelector('#popup__form-photo');
const photoText = formPhoto.querySelector("input[name='photoText']");
const photoLink = formPhoto.querySelector("input[name='photoLink']");
//Попапа с картинкой
const imagePopap = document.querySelector('#imagePopap');
const popupPhoto = document.querySelector('.popup__photo');
const popupImageSubtitle = document.querySelector('.popup__image-subtitle');
const imagePopapСlose = document.querySelector('#imagePopap__close');

//----------------------Код работы с фотокарточками-----------------------
const addCard = (cardElement) => {
    const cardsElement = cardTemplate.cloneNode(true);
    cardsElement.querySelector('.element__text').innerText = cardElement.text;
    cardsElement.querySelector('.element__image').src = cardElement.link;
    cardsElement.querySelector('.element__image').alt = cardElement.text;
    //Поставить\убрать лайк
    cardsElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    //Удалить карточку
    cardsElement.querySelector('.elements__delete').addEventListener('click', evt => {
        const cardDelete = evt.target.closest('.element');
        cardDelete.remove();
    });

    //---------------------данные для попапа с фото
    cardsElement.querySelector('.element__image').addEventListener('click', evt => {
        const photoLink = evt.target.src;
        const photoName = evt.target.closest('.element');
        const photoText = photoName.querySelector('.element__text').textContent;
        imagePopap.classList.toggle('popup_opened');
        popupPhoto.src = photoLink;
        popupImageSubtitle.textContent = photoText;
    });
    //------------------------------
    elements.prepend(cardsElement);
};

//Пройтись по массиву
const reversCards = initialCards.forEach(addCard)

//Открыть\закрыть попап добавления фотокарточек
function outFotoPopup() {
    addPopup.classList.toggle('popup_opened');
};



//Добавление новых фото на страницу
formPhoto.addEventListener('submit', evt => {
    evt.preventDefault();
    let newCard =
    {
        link: photoLink.value,
        text: photoText.value
    };
    addCard(newCard);
    formPhoto.reset();
    outFotoPopup()
});
//------------------------ Конец кода фотокарточек-----------------------------


// Открыть Popup текста профиля с заполнением imput/закрыть Popup 
function enterPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent
    jobInput.value = profileText.textContent
};
function exitPopup() {
    popup.classList.remove('popup_opened');
};

// Сохранение дынных профиля из формы Popup
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value
    profileText.textContent = jobInput.value
    exitPopup()
};
formElement.addEventListener('submit', formSubmitHandler);

//Слушатели Открытия/закрытия попапа добаления фото
addClosePopup.addEventListener('click', outFotoPopup);
addButton.addEventListener('click', outFotoPopup);
//Слушатели Открытия/закрытия попапа текста профиля
openPopup.addEventListener('click', enterPopup);
closePopup.addEventListener('click', exitPopup);
//Закрыть фото
imagePopapСlose.addEventListener('click', function () {
    imagePopap.classList.toggle('popup_opened');
})