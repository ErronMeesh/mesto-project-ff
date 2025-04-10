export function createCard(cardData, deleteCard, handleCardClick, handleLikeClick, cardTemplate) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  cardImage.addEventListener("click", () => handleCardClick(cardData.name, cardData.link));
  likeButton.addEventListener("click", () => handleLikeClick(likeButton));

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function handleLikeClick(button) {
  button.classList.toggle('card__like-button_is-active');
}