(()=>{"use strict";class e{constructor(e,t,s){this._name=e.name,this._link=e.link,this._cardSelector=t,this._handleCardClick=s}_getTemplate(){return document.querySelector(this._cardSelector).content.cloneNode(!0)}generateCard(){this._element=this._getTemplate();const e=this._element.querySelector(".element__image"),t=this._element.querySelector(".element__text");return e.src=this._link,e.alt=this._name,t.textContent=this._name,this._setEventListeners(),this._element}_setEventListeners(){this._element.querySelector(".element__like").addEventListener("click",(e=>{this._toggleLike(e)})),this._element.querySelector(".elements__delete").addEventListener("click",(e=>{this._deleteFotoCard(e)})),this._element.querySelector(".element__image").addEventListener("click",this._handleCardClick)}_toggleLike(e){e.target.classList.toggle("element__like_active")}_deleteFotoCard(e){e.target.closest(".element").remove()}}const t={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_visible",inputError:".popup__input-error"};class s{constructor(e,t){this._form=t,this._formSelector=e.formSelector,this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inputErrorClass=e.inputErrorClass,this._inactiveButtonClass=e.inactiveButtonClass,this._errorClass=e.errorClass,this._inputError=e.inputError,this._inputs=Array.from(this._form.querySelectorAll(this._inputSelector))}_showInputError(e){this._errorElement=this._form.querySelector("#".concat(e.id,"-error")),e.classList.add(this._inputErrorClass),this._errorElement.classList.add(this._errorClass),this._errorElement.textContent=this._element.validationMessage}_hideInputError(e){this._errorElement=this._form.querySelector("#".concat(e.id,"-error")),e.classList.remove(this._inputErrorClass),this._errorElement.classList.remove(this._errorClass),this._errorElement.textContent=""}_isValid(e){this._element=e,this._element.validity.valid?this._hideInputError(e):this._showInputError(e)}_hasInvalidInput(){return this._inputs.some((e=>!e.validity.valid))}_toggleButtonState(){this._buttonElement.setAttribute("disabled",!0),this._buttonElement.classList.add(this._inactiveButtonClass)}toggleSubmit(){this._hasInvalidInput()?this._toggleButtonState():(this._buttonElement.removeAttribute("disabled",!0),this._buttonElement.classList.remove(this._inactiveButtonClass))}_setEventListeners(){this._buttonElement=this._form.querySelector(this._submitButtonSelector),this._inputs.forEach((e=>{e.addEventListener("input",(()=>{this._isValid(e),this.toggleSubmit()}))}))}enableValidation(){this._setEventListeners(),this._form.addEventListener("submit",(e=>e.preventDefault()),this.toggleSubmit())}hideAllErrors(){this._inputs.forEach((e=>{this._hideInputError(e)})),this._toggleButtonState()}}class r{constructor(e){this._popupSelector=e,this._popupOverlay=this._popupSelector.querySelector(".popup__overlay"),this._closePopup=this._popupSelector.querySelector(".popup__close"),this._handleEscClose=this._handleEscClose.bind(this),this._classOpenedPopup="popup_opened"}open(){document.addEventListener("keydown",this._handleEscClose),this._popupSelector.classList.add(this._classOpenedPopup)}close(){document.removeEventListener("keydown",this._handleEscClose),this._popupSelector.classList.remove(this._classOpenedPopup)}_handleEscClose(e){"Escape"===e.key&&this.close()}setEventListeners(){this._closePopup.addEventListener("click",(()=>{this.close()})),this._popupOverlay.addEventListener("click",(()=>{this._popupSelector.classList.contains(this._classOpenedPopup)&&this.close()}))}}class o extends r{constructor(e,t){let{formSubmitCallBack:s}=t;super(e),this._formSubmitCallBack=s,this._formSubmit=this._formSubmit.bind(this),this._form=this._popupSelector.querySelector(".popup__form"),this._inputs=Array.from(this._form.querySelectorAll(".popup__input"))}_formSubmit(){this._formSubmitCallBack(this._getInputValues())}_getInputValues(){const e={};return this._inputs.forEach((t=>{e[t.name]=t.value})),e}close(){super.close(),this._form.reset()}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",this._formSubmit)}}const i=document.querySelector("#popup__form-profile"),n=document.querySelector("#popup__Profile"),l=document.querySelector("#popup__card"),a=document.querySelector("#popap__image"),c=document.querySelector("#popap__avatar"),_=i.querySelector("#popup__name-input"),u=i.querySelector("#popup__text-input"),p=document.querySelector(".profile__name"),h=document.querySelector(".profile__text"),m=document.querySelector(".profile__avatar"),d=document.querySelector(".profile__avatar-batton"),S=document.querySelector(".elements"),v=document.querySelector(".profile__edit"),f=document.querySelector(".profile__addfoto-button"),E=new class{constructor(e){this._baseUrl=e.serverUrl,this._token=e.token}_requestResult(e){return e.ok?e.json():Promise.reject("Хьюстон, у нас проблемы: Ошибка ".concat(e.status," ").concat(e.statusText))}getUserInfo(){return fetch("".concat(this._baseUrl,"users/me"),{headers:{authorization:this._token}}).then((e=>this._requestResult(e)))}editProfile(e){return fetch("".concat(this._baseUrl,"users/me"),{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({name:e.name.trim(),about:e.about.trim()})}).then((e=>this._requestResult(e)))}getInitialCards(){return fetch("".concat(this._baseUrl,"cards"),{headers:{authorization:this._token}}).then((e=>this._requestResult(e)))}editAvatar(e){return fetch("".concat(this._baseUrl,"users/me/avatar"),{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({avatar:e.avatarLink})}).then((e=>this._requestResult(e)))}}({serverUrl:"https://mesto.nomoreparties.co/v1/cohort-27/",token:"8747a9a0-014b-48d6-8e47-516b00c90197"});let b;const g=[E.getUserInfo(),E.getInitialCards()],y=new s(t,n),C=new s(t,l),k=new s(t,c);y.enableValidation(),C.enableValidation(),k.enableValidation();const L=e=>{const t={link:e.target.src,text:e.target.closest(".element").querySelector(".element__text").textContent};q.open(t)},q=new class extends r{constructor(e){super(e),this._imageElement=this._popupSelector.querySelector(".popup__photo"),this._popupImageSubtitle=this._popupSelector.querySelector(".popup__image-subtitle")}open(e){let{text:t,link:s}=e;this._imageElement.src=s,this._imageElement.alt=t,this._popupImageSubtitle.textContent=t,super.open()}}(a);q.setEventListeners();const I=t=>new e(t,"#cardTemplate",L).generateCard(t),x=new class{constructor(e,t){let{renderItems:s}=e;this._renderer=s,this._container=t}renderItems(e){e.forEach((e=>{this._renderer(e)}))}addItem(e){this._container.prepend(e)}}({renderItems:e=>{x.addItem(I(e))}},S),A=new o(l,{formSubmitCallBack:e=>{const t={text:e.photoText,link:e.photoLink};x.addItem(I(t),!0),A.close(),console.log()}});A.setEventListeners();const B=new class{constructor(e){let{profileName:t,profileText:s,profileAvatar:r}=e;this._name=t,this._text=s,this._profileAvatar=r}getUserInfo(){return{name:this._name.textContent,text:this._text.textContent}}setUserInfo(e){this._name.textContent=e.name,this._text.textContent=e.about}setAvatarInfo(e){this._profileAvatar.style.backgroundImage='url("'.concat(e.avatar,'")')}}({profileName:p,profileText:h,profileAvatar:m}),w=new o(n,{formSubmitCallBack:e=>{E.editProfile(e).then((e=>{B.setUserInfo(e),w.close()})).catch((e=>console.log(e)))}});w.setEventListeners();const U=new o(c,{formSubmitCallBack:e=>{E.editAvatar(e).then((e=>{B.setAvatarInfo(e),U.close()})).catch((e=>console.log(e)))}});U.setEventListeners(),v.addEventListener("click",(()=>{const e=B.getUserInfo();y.hideAllErrors(),_.value=e.name,u.value=e.text,w.open()})),f.addEventListener("click",(()=>{A.open(),C.hideAllErrors()})),d.addEventListener("click",(()=>{U.open(),k.enableValidation()})),Promise.all(g).then((e=>{let[t,s]=e;b=t._id,B.setUserInfo(t),B.setAvatarInfo(t),x.renderItems(s)})).catch((e=>console.log(e)))})();