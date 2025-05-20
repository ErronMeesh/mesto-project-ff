import '../pages/index.css';
import '../vendor/normalize.css';
import '../vendor/fonts.css';

import { createCard, handleLikeClick } from './components/card.js';
import { openModal, closeModal, setupOverlayClose, setupCloseButton } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, updateUserAvatar } from './components/api.js';
import { renderCard, renderLoading } from './components/utils.js';

// конфиг валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// DOM
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const deletePopup = document.querySelector('.popup_type_delete');

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__image');

const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formAdd = document.querySelector('.popup__form[name="new-place"]');
const placeInput = formAdd.querySelector('.popup__input_type_card-name');
const linkInput = formAdd.querySelector('.popup__input_type_url');

const avatarForm = document.querySelector('.popup__form[name="avatar-form"]');
const avatarInput = avatarForm.querySelector('.popup__input_type_url');

const popupImage = popupImg.querySelector('.popup__image');
const popupCaption = popupImg.querySelector('.popup__caption');

let userId = null;

// модальное окно изображения
function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(popupImg);
}

function initializeApp() {
  // валидация
  enableValidation(validationConfig);

  // закрытие попапов
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    setupOverlayClose(popup);
    setupCloseButton(popup);
  });

  // изначальный текст кнопок
  document.querySelectorAll('.popup__form .popup__button').forEach((button) => {
    button.dataset.originalText = button.textContent;
  });

  // данные пользователя и карточки
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
      userId = userData._id;
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

      cards.forEach(cardData => {
        const cardElement = createCard(cardData, handleCardClick, handleLikeClick, cardTemplate, userId, deletePopup); // Передаём deletePopup
        renderCard(cardElement, placesList);
      });
    })
    .catch((err) => {
      console.error('Ошибка при загрузке данных:', err);
    });
}

// открытие формы редакт профиля
function handleEditButtonClick() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupEdit);
}

// открытие формы + карточки
function handleAddButtonClick() {
  formAdd.reset();
  clearValidation(formAdd, validationConfig);
  openModal(popupAdd);
}

// открытие формы обновления аватара
function handleAvatarClick() {
  avatarForm.reset();
  avatarInput.value = '';
  clearValidation(avatarForm, validationConfig);
  openModal(popupAvatar);
}

// отправка формы профиля
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  const button = evt.submitter;
  renderLoading(true, button);

  const name = nameInput.value;
  const about = jobInput.value;

  updateUserInfo(name, about)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении профиля:', err);
    })
    .finally(() => {
      renderLoading(false, button);
    });
}

// отправка формы + карточки
function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  const button = evt.submitter;
  renderLoading(true, button);

  const title = placeInput.value;
  const link = linkInput.value;

  addNewCard(title, link)
    .then((newCard) => {
      const cardElement = createCard(newCard, handleCardClick, handleLikeClick, cardTemplate, userId, deletePopup); // Передаём deletePopup
      renderCard(cardElement, placesList, true);
      closeModal(popupAdd);
      formAdd.reset();
    })
    .catch((err) => {
      console.error('Ошибка при добавлении карточки:', err);
    })
    .finally(() => {
      renderLoading(false, button);
    });
}

// отправка формы аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const button = evt.submitter;
  renderLoading(true, button);

  const avatarUrl = avatarInput.value;

  updateUserAvatar(avatarUrl)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      closeModal(popupAvatar);
      avatarForm.reset();
    })
    .catch((err) => {
      console.error('Ошибка при обновлении аватара:', err);
    })
    .finally(() => {
      renderLoading(false, button);
    });
}

editBtn.addEventListener('click', handleEditButtonClick);
addBtn.addEventListener('click', handleAddButtonClick);
profileAvatar.addEventListener('click', handleAvatarClick);
formEditProfile.addEventListener('submit', handleFormSubmitEdit);
formAdd.addEventListener('submit', handleFormSubmitAdd);
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

initializeApp();