import { removeEffect, setScaleDefaultValue, setPictureTransform } from './picture-effects.js';
import { sendFormDataToApi } from './api.js';

const uploadInput = document.getElementById('upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const closeButton = document.getElementById('upload-cancel');
const form = document.getElementById('upload-select-image');
const textArea = document.querySelector('.text__description');
const errorsDiv = document.querySelector('.errors');
const preview = document.querySelector('.img-upload__preview');
const picture = preview.querySelector('img');

const showModal = (item, callback = null) => {
  if (!item) {
    return;
  }

  item.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  if (typeof callback === 'function') {
    callback();
  }
};

const closeModal = (item, callback = null) => {
  if (!item) {
    return;
  }

  item.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  if (typeof callback === 'function') {
    callback();
  }
};

const picturePreview = (input) => {
  const [file] = input.files;
  if (!file) {
    return;
  }

  picture.src = URL.createObjectURL(file);
};

const formReset = () => {
  closeModal(uploadModal);
  form.reset();
  removeEffect(picture);
  setScaleDefaultValue();
  setPictureTransform(1);
};

const onSuccess = (response) => {
  closeModal(uploadModal);
  if (response.status !== 200) {
    throw new Error('Server error');
  }

  formReset();
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const itemElement = successTemplate.cloneNode(true);
  document.body.appendChild(itemElement);
};

const onError = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const itemElement = errorTemplate.cloneNode(true);
  document.body.appendChild(itemElement);
};

const addFormSubmitEvent = () => {
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

    const formData = new FormData(evt.target);
    sendFormDataToApi(formData, onSuccess, onError);
  }, { once: true });

  closeButton.addEventListener('click', () => {
    formReset();
  }, { once: true });

  document.addEventListener('keydown', (evt) => {
    // Добавляем чтоб убрать второй скролл
    document.querySelector('body').classList.add('modal-open');
    if(evt.key === 'Escape' && textArea !== document.activeElement) {
      formReset();
    }
  }, { once: true });
};

const uploadPicture = () => {
  uploadInput.addEventListener('change', () => {
    picturePreview(uploadInput);
    setScaleDefaultValue();
    showModal(uploadModal, addFormSubmitEvent);
  });
};

export { uploadPicture, showModal, closeModal };
