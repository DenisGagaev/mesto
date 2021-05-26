const openPopup = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closePopup = popup.querySelector('.popup__close');


function closeOpen() {
    openPopup.addEventListener('click', closeOpen);
    closePopup.addEventListener('click', closeOpen);
    popup.classList.toggle('popup_opened');
}
closeOpen()


const formElement = document.querySelector('.popup__form')
const nameInput = popup.querySelector('#nickName')
const jobInput = popup.querySelector('#aboutme') 

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let inputs = document.querySelectorAll('input');
    let profileName = document.querySelector('.profile__name');
    let profileText = document.querySelector('.profile__text');
    profileName.textContent = inputs[0].value
    profileText.textContent = inputs[1].value
    closeOpen()
}
formElement.addEventListener('submit', formSubmitHandler);
