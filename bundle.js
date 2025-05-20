/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/scripts/components/api.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-mag-4',
  headers: {
    authorization: 'f0673a8e-5356-4e5b-ba6e-6ff35eda9391'
  }
};
var handleResponse = function handleResponse(res) {
  if (res.ok) {
    return res.status === 204 ? {} : res.json();
  }
  return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
};
var getUserInfo = function getUserInfo() {
  return fetch("".concat(config.baseUrl, "/users/me"), {
    headers: config.headers
  }).then(handleResponse);
};
var getInitialCards = function getInitialCards() {
  return fetch("".concat(config.baseUrl, "/cards"), {
    headers: config.headers
  }).then(handleResponse);
};
var updateUserInfo = function updateUserInfo(name, about) {
  return fetch("".concat(config.baseUrl, "/users/me"), {
    method: 'PATCH',
    headers: _objectSpread(_objectSpread({}, config.headers), {}, {
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      name: name,
      about: about
    })
  }).then(handleResponse);
};
var addNewCard = function addNewCard(name, link) {
  return fetch("".concat(config.baseUrl, "/cards"), {
    method: 'POST',
    headers: _objectSpread(_objectSpread({}, config.headers), {}, {
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      name: name,
      link: link
    })
  }).then(handleResponse);
};
var deleteCardFromServer = function deleteCardFromServer(cardId) {
  return fetch("".concat(config.baseUrl, "/cards/").concat(cardId), {
    method: 'DELETE',
    headers: config.headers
  }).then(handleResponse);
};
var likeCard = function likeCard(cardId) {
  return fetch("".concat(config.baseUrl, "/cards/likes/").concat(cardId), {
    method: 'PUT',
    headers: config.headers
  }).then(handleResponse);
};
var unlikeCard = function unlikeCard(cardId) {
  return fetch("".concat(config.baseUrl, "/cards/likes/").concat(cardId), {
    method: 'DELETE',
    headers: config.headers
  }).then(handleResponse);
};
var updateUserAvatar = function updateUserAvatar(avatarUrl) {
  return fetch("".concat(config.baseUrl, "/users/me/avatar"), {
    method: 'PATCH',
    headers: _objectSpread(_objectSpread({}, config.headers), {}, {
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      avatar: avatarUrl
    })
  }).then(handleResponse);
};
;// ./src/scripts/components/modal.js
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}
function setupOverlayClose(popup) {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
}
function setupCloseButton(popup) {
  var closeBtn = popup.querySelector('.popup__close');
  closeBtn.addEventListener('click', function () {
    return closeModal(popup);
  });
}
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    var openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
;// ./src/scripts/components/utils.js


function renderLoading(isLoading, buttonElement) {
  var loadingText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Сохранение...';
  if (isLoading) {
    buttonElement.textContent = loadingText;
  } else {
    buttonElement.textContent = buttonElement.dataset.originalText;
  }
}
function renderCard(cardElement, container) {
  var prepend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (prepend) {
    container.prepend(cardElement);
  } else {
    container.append(cardElement);
  }
}
function openDeletePopup(cardId, cardElement, deletePopup) {
  openModal(deletePopup);
  var deleteForm = deletePopup.querySelector('form');
  deleteForm.onsubmit = function (evt) {
    evt.preventDefault();
    var button = evt.submitter;
    renderLoading(true, button, 'Удаление...');
    deleteCardFromServer(cardId).then(function () {
      cardElement.remove();
      closeModal(deletePopup);
    }).catch(function (err) {
      console.error('Ошибка удаления карточки:', err);
    }).finally(function () {
      renderLoading(false, button);
    });
  };
}
;// ./src/scripts/components/card.js


function createCard(cardData, handleCardClick, handleLikeClick, cardTemplate, userId, deletePopup) {
  var cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  var cardImage = cardElement.querySelector('.card__image');
  var cardTitle = cardElement.querySelector('.card__title');
  var deleteButton = cardElement.querySelector('.card__delete-button');
  var likeButton = cardElement.querySelector('.card__like-button');
  var likeCount = cardElement.querySelector('.card__like-count');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = Array.isArray(cardData.likes) ? cardData.likes.length : 0;
  if (cardData.owner && cardData.owner._id === userId) {
    deleteButton.addEventListener('click', function () {
      openDeletePopup(cardData._id, cardElement, deletePopup);
    });
  } else {
    deleteButton.style.display = 'none';
  }
  if (cardData.likes && userId) {
    var hasUserLiked = cardData.likes.some(function (user) {
      return user._id === userId;
    });
    if (hasUserLiked) {
      likeButton.classList.add('card__like-button_is-active');
    }
  }
  cardImage.addEventListener('click', function () {
    return handleCardClick(cardData.name, cardData.link);
  });
  likeButton.addEventListener('click', function () {
    return handleLikeClick(cardData, likeButton, likeCount, userId);
  });
  return cardElement;
}
function handleLikeClick(cardData, button, likeCountElement, userId) {
  var hasUserLiked = cardData.likes.some(function (user) {
    return user._id === userId;
  });
  var likeAction = hasUserLiked ? unlikeCard : likeCard;
  likeAction(cardData._id).then(function (updatedCard) {
    likeCountElement.textContent = updatedCard.likes.length;
    cardData.likes = updatedCard.likes;
    if (updatedCard.likes.some(function (user) {
      return user._id === userId;
    })) {
      button.classList.add('card__like-button_is-active');
    } else {
      button.classList.remove('card__like-button_is-active');
    }
  }).catch(function (err) {
    console.error('Ошибка при лайке/дизлайке:', err);
  });
}
;// ./src/scripts/components/validation.js
function showInputError(formElement, inputElement, errorMessage, config) {
  var errorElement = formElement.querySelector("#".concat(inputElement.id, "-error"));
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}
function hideInputError(formElement, inputElement, config) {
  var errorElement = formElement.querySelector("#".concat(inputElement.id, "-error"));
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}
function isValid(inputElement) {
  var pattern = /^[a-zа-яё\s-]+$/i;
  var value = inputElement.value.trim();
  if (inputElement.type === 'text' && inputElement.hasAttribute('data-error-message')) {
    var isPatternValid = pattern.test(value) || value === '';
    if (!isPatternValid) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }
  } else {
    inputElement.setCustomValidity('');
  }
  return inputElement.validity.valid;
}
function checkInputValidity(formElement, inputElement, config) {
  if (!isValid(inputElement)) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}
function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}
function setEventListeners(formElement, config) {
  var inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  var buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}
function enableValidation(config) {
  var formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      return evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
}
function clearValidation(formElement, config) {
  var inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  var buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach(function (inputElement) {
    hideInputError(formElement, inputElement, config);
    inputElement.setCustomValidity('');
  });
  toggleButtonState(inputList, buttonElement, config);
}
;// ./src/scripts/index.js
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }









// конфиг валидации
var validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// DOM
var cardTemplate = document.querySelector('#card-template').content;
var placesList = document.querySelector('.places__list');
var popupEdit = document.querySelector('.popup_type_edit');
var popupAdd = document.querySelector('.popup_type_new-card');
var popupImg = document.querySelector('.popup_type_image');
var popupAvatar = document.querySelector('.popup_type_avatar');
var deletePopup = document.querySelector('.popup_type_delete');
var editBtn = document.querySelector('.profile__edit-button');
var addBtn = document.querySelector('.profile__add-button');
var profileAvatar = document.querySelector('.profile__image');
var formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
var nameInput = formEditProfile.querySelector('.popup__input_type_name');
var jobInput = formEditProfile.querySelector('.popup__input_type_description');
var profileTitle = document.querySelector('.profile__title');
var profileDescription = document.querySelector('.profile__description');
var formAdd = document.querySelector('.popup__form[name="new-place"]');
var placeInput = formAdd.querySelector('.popup__input_type_card-name');
var linkInput = formAdd.querySelector('.popup__input_type_url');
var avatarForm = document.querySelector('.popup__form[name="avatar-form"]');
var avatarInput = avatarForm.querySelector('.popup__input_type_url');
var popupImage = popupImg.querySelector('.popup__image');
var popupCaption = popupImg.querySelector('.popup__caption');
var userId = null;

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
  var popups = document.querySelectorAll('.popup');
  popups.forEach(function (popup) {
    setupOverlayClose(popup);
    setupCloseButton(popup);
  });

  // изначальный текст кнопок
  document.querySelectorAll('.popup__form .popup__button').forEach(function (button) {
    button.dataset.originalText = button.textContent;
  });

  // данные пользователя и карточки
  Promise.all([getUserInfo(), getInitialCards()]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      userData = _ref2[0],
      cards = _ref2[1];
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = "url(".concat(userData.avatar, ")");
    cards.forEach(function (cardData) {
      var cardElement = createCard(cardData, handleCardClick, handleLikeClick, cardTemplate, userId, deletePopup); // Передаём deletePopup
      renderCard(cardElement, placesList);
    });
  }).catch(function (err) {
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
  var button = evt.submitter;
  renderLoading(true, button);
  var name = nameInput.value;
  var about = jobInput.value;
  updateUserInfo(name, about).then(function (data) {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    closeModal(popupEdit);
  }).catch(function (err) {
    console.error('Ошибка при обновлении профиля:', err);
  }).finally(function () {
    renderLoading(false, button);
  });
}

// отправка формы + карточки
function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  var button = evt.submitter;
  renderLoading(true, button);
  var title = placeInput.value;
  var link = linkInput.value;
  addNewCard(title, link).then(function (newCard) {
    var cardElement = createCard(newCard, handleCardClick, handleLikeClick, cardTemplate, userId, deletePopup); // Передаём deletePopup
    renderCard(cardElement, placesList, true);
    closeModal(popupAdd);
    formAdd.reset();
  }).catch(function (err) {
    console.error('Ошибка при добавлении карточки:', err);
  }).finally(function () {
    renderLoading(false, button);
  });
}

// отправка формы аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  var button = evt.submitter;
  renderLoading(true, button);
  var avatarUrl = avatarInput.value;
  updateUserAvatar(avatarUrl).then(function (data) {
    profileAvatar.style.backgroundImage = "url(".concat(data.avatar, ")");
    closeModal(popupAvatar);
    avatarForm.reset();
  }).catch(function (err) {
    console.error('Ошибка при обновлении аватара:', err);
  }).finally(function () {
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
/******/ })()
;