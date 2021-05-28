const openPopup = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closePopup = popup.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form')
let nameInput = formElement.querySelector("input[name='profileName']");
let jobInput = formElement.querySelector("input[name='profileText']");
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');

// Открыть Popup с заполнением imput/закрыть Popup 
openPopup.addEventListener('click', open);
closePopup.addEventListener('click', close);
function open() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent
    jobInput.value = profileText.textContent
}
function close() {
    popup.classList.remove('popup_opened');
}

// Сохранение дынных профиля из формы Popup
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value
    profileText.textContent = jobInput.value
    close()
}
formElement.addEventListener('submit', formSubmitHandler);
