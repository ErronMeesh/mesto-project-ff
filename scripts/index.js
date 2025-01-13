const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

// создание карточки
function createCard(cardData, deleteCard) { 
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // данные для карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // обработчик удаления карточки
  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  return cardElement;
}

// Ф-я удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// + карточек на страницу
function renderCards(cards) {
  cards.forEach(function (card) {
    const cardElement = createCard(card, deleteCard);
    placesList.append(cardElement);
  });
}

renderCards(initialCards);



