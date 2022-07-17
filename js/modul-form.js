import { showModal, closeModal } from './util.js';

function uploadPicture() {
  const uploadInput = document.getElementById('upload-file');
  const uploadModal = document.querySelector('.img-upload__overlay');
  const closeButton = document.getElementById('upload-cancel');
  const form = document.getElementById('upload-select-image');
  const textArea = document.querySelector('.text__description');
  const errorsDiv = document.querySelector('.errors');

  uploadInput.addEventListener('change', () => {
    showModal(uploadModal);
  });

  closeButton.addEventListener('click', () => {
    closeModal(uploadModal);
    uploadInput.value = '';
  });

  document.addEventListener('keydown', (evt) => {
    // Добавляем чтоб убрать второй скролл
    document.querySelector('body').classList.add('modal-open');
    if(evt.key === 'Escape' && textArea !== document.activeElement) {
      closeModal(uploadModal);
      uploadInput.value = '';
    }
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    errorsDiv.innerHTML = '';

    textArea.style.borderWidth = '1px';
    textArea.style.borderColor = 'black';

    if (textArea.value.length > 140) {
      textArea.style.borderWidth = '4px';
      textArea.style.borderColor = 'red';
      const span = document.createElement('span');
      span.style.display = 'block';
      span.style.color = 'red';
      span.innerHTML = `Максимальное колличество символов = 140, у вас ${textArea.value.length}`;
      errorsDiv.appendChild(span);

      return false;
    }

    return true;
  });
}

export { uploadPicture };
