import { likeCard, unlikeCard } from './api.js';
import { openDeletePopup } from './utils.js';

export function createCard(cardData, handleCardClick, handleLikeClick, cardTemplate, userId, deletePopup) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = Array.isArray(cardData.likes) ? cardData.likes.length : 0;

  if (cardData.owner && cardData.owner._id === userId) {
    deleteButton.addEventListener('click', () => {
      openDeletePopup(cardData._id, cardElement, deletePopup);
    });
  } else {
    deleteButton.style.display = 'none';
  }

  if (cardData.likes && userId) {
    const hasUserLiked = cardData.likes.some(user => user._id === userId);
    if (hasUserLiked) {
      likeButton.classList.add('card__like-button_is-active');
    }
  }

  cardImage.addEventListener('click', () => handleCardClick(cardData.name, cardData.link));
  likeButton.addEventListener('click', () => handleLikeClick(cardData, likeButton, likeCount, userId));

  return cardElement;
}

export function handleLikeClick(cardData, button, likeCountElement, userId) {
  const hasUserLiked = cardData.likes.some(user => user._id === userId);
  const likeAction = hasUserLiked ? unlikeCard : likeCard;

  likeAction(cardData._id)
    .then(updatedCard => {
      likeCountElement.textContent = updatedCard.likes.length;
      cardData.likes = updatedCard.likes;
      if (updatedCard.likes.some(user => user._id === userId)) {
        button.classList.add('card__like-button_is-active');
      } else {
        button.classList.remove('card__like-button_is-active');
      }
    })
    .catch(err => {
      console.error('Ошибка при лайке/дизлайке:', err);
    });
}