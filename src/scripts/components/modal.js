export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

export function setupOverlayClose(popup) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
}

export function setupCloseButton(popup) {
  const closeBtn = popup.querySelector('.popup__close');
  closeBtn.addEventListener('click', () => closeModal(popup));
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}