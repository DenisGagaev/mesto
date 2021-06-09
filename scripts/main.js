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
const formPhoto = document.querySelector('#popup__form-photo')
const photoText = formPhoto.querySelector("input[name='photoText']");
const photoLink = formPhoto.querySelector("input[name='photoLink']");

//Пройтись по массиву
function addCards() {
    initialCards.forEach(addCard)
}
//
function addCard({ link, text }) {
    const elementFoto = cardTemplate.cloneNode(true);
    elementFoto.querySelector('.element__image').src = link;
    elementFoto.querySelector('.element__text').innerText = text;
    elementFoto.querySelector('.element__image').alt = text;
    elements.prepend(elementFoto);
};
//Вызвать фотокарточки из массива
addCards()
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

//Слушатели
addClosePopup.addEventListener('click', outFotoPopup);
addButton.addEventListener('click', outFotoPopup);
openPopup.addEventListener('click', enterPopup);
closePopup.addEventListener('click', exitPopup);