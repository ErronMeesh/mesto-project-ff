import '../pages/index.css';
import '../vendor/normalize.css';
import '../vendor/fonts.css';
import { createCard, deleteCard, handleLikeClick } from './components/card.js';
import { openModal, closeModal, setupOverlayClose, setupCloseButton } from './components/modal.js';
import { initialCards } from './cards.js';

// ======= переменные =======
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImg = document.querySelector(".popup_type_image");

const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");

const formEditProfile = document.querySelector(".popup__form[name='edit-profile']");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const formAdd = document.querySelector(".popup__form[name='new-place']");
const placeInput = formAdd.querySelector(".popup__input_type_card-name");
const linkInput = formAdd.querySelector(".popup__input_type_url");

// ======= Функции работы с карточками =======
function handleCardClick(cardData) {
  const popupImage = popupImg.querySelector(".popup__image");
  const popupCaption = popupImg.querySelector(".popup__caption");

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openModal(popupImg);
}

function renderCards(cards) {
  cards.forEach((card) => {
    const cardElement = createCard(card, deleteCard, handleCardClick, handleLikeClick, cardTemplate);
    placesList.append(cardElement);
  });
}

function addCard(title, srcImg) {
  const cardElement = createCard({ name: title, link: srcImg }, deleteCard, handleCardClick, handleLikeClick, cardTemplate);
  placesList.prepend(cardElement);
}

// ======= работа с модалками =======
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  setupOverlayClose(popup);
  setupCloseButton(popup); // Добавляем настройку кнопки закрытия
});

// ======= обработчики кнопок =======
editBtn.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
});

addBtn.addEventListener("click", () => {
  openModal(popupAdd);
});

// ======= обработчики форм =======
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}
formEditProfile.addEventListener('submit', handleFormSubmitEdit);

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  addCard(placeInput.value, linkInput.value);
  closeModal(popupAdd);
  formAdd.reset();
}
formAdd.addEventListener('submit', handleFormSubmitAdd);

// ======= рендер начальных карточек =======
renderCards(initialCards);