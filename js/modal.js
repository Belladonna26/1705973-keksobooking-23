let renderedModal;
let renderedModalTimeout;

/**
 * @affects renderedModal
 * @affects renderedModalTimeout
 * @affects document
 * @returns {void}
 */
const handleWindowEscKeyDown = (evt) => {
  if (!renderedModal) {
    return;
  }

  if (evt.code === 'Escape') {
    renderedModal.remove();

    if (renderedModalTimeout) {
      clearTimeout(renderedModalTimeout);

      renderedModalTimeout = undefined;
    }
  }
};

/**
 * @affects renderedModal
 * @affects renderedModalTimeout
 * @affects window
 * @affects document
 * @returns {void}
 */
export const hideModal = () => {
  if (!renderedModal) {
    return;
  }

  renderedModal.remove();

  renderedModal = undefined;

  if (renderedModalTimeout) {
    clearTimeout(renderedModalTimeout);

    renderedModalTimeout = undefined;
  }

  window.removeEventListener('keydown', handleWindowEscKeyDown);
};

/**
 * @param {string} message Сообщение
 * @param {boolean} [isError] Является ли модалка уведомлением об ошибке
 * @param {object} [buttonParams] Параметры кнопки
 * @param {string} buttonParams.text Текст кнопки
 * @param {function(Event): void} buttonParams.onClick Обработчик клика кнопки
 * @returns {HTMLDivElement}
 */
export const createModal = (message, isError, buttonParams) => {
  const modalTemplate = document.querySelector('#modal');

  if (modalTemplate === null) {
    throw new Error('Не найден modalTemplate');
  }

  const modalTemplateContent = modalTemplate.content.querySelector('.modal');

  if (modalTemplateContent === null) {
    throw new Error('Не найден modalTemplateContent');
  }

  const modal = modalTemplateContent.cloneNode(true);
  const modalMessage = modal.querySelector('.modal__message');
  const modalButton = modal.querySelector('.modal__button');

  if (modalMessage === null || modalButton === null) {
    throw new Error('В modal отсутствуют необходимые элементы');
  }

  if (isError) {
    modal.classList.add('modal_error');
  }

  modalMessage.textContent = message;

  /**
   * @param {Event} evt
   * @affects renderedModal
   * @affects window
   * @affects document
   * @returns {void}
   */
  const handleModalClick = (evt) => {
    if (evt.target !== modal) {
      return;
    }

    hideModal();
  };

  modal.addEventListener('click', handleModalClick);

  if (!buttonParams) {
    modalButton.remove();

    return modal;
  }

  modalButton.textContent = buttonParams.text;
  modalButton.addEventListener('click', buttonParams.onClick);

  return modal;
};

/**
 * @param {object} modalParams
 * @param {string} modalParams.message
 * @param {boolean} [modalParams.isError]
 * @param {object} [modalParams.button]
 * @param {string} modalParams.button.text
 * @param {function(Event): void} modalParams.button.onClick
 * @param {number} [timeout]
 * @affects renderedModal
 * @affects renderedModalTimeout
 * @affects window
 * @affects document
 * @returns {void}
 */
export const showModal = (modalParams, timeout) => {
  if (renderedModal) {
    hideModal();
  }

  window.addEventListener('keydown', handleWindowEscKeyDown, {once: true});

  renderedModal = document.body.appendChild(createModal(modalParams.message, modalParams.isError, modalParams.buttonParams));

  if (timeout) {
    renderedModalTimeout = setTimeout(hideModal, timeout);
  }
};
