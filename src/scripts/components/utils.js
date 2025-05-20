import { openModal, closeModal } from './modal.js';
import { deleteCardFromServer } from './api.js';

export function renderLoading(isLoading, buttonElement, loadingText = 'Сохранение...') {
  if (isLoading) {
    buttonElement.textContent = loadingText;
  } else {
    buttonElement.textContent = buttonElement.dataset.originalText;
  }
}

export function renderCard(cardElement, container, prepend = false) {
  if (prepend) {
    container.prepend(cardElement);
  } else {
    container.append(cardElement);
  }
}

export function openDeletePopup(cardId, cardElement, deletePopup) {
  openModal(deletePopup);
  const deleteForm = deletePopup.querySelector('form');
  deleteForm.onsubmit = (evt) => {
    evt.preventDefault();
    const button = evt.submitter;
    renderLoading(true, button, 'Удаление...');

    deleteCardFromServer(cardId)
      .then(() => {
        cardElement.remove();
        closeModal(deletePopup);
      })
      .catch((err) => {
        console.error('Ошибка удаления карточки:', err);
      })
      .finally(() => {
        renderLoading(false, button);
      });
  };
}