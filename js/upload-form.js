import { removeEffect, setScaleDefaultValue, setPictureTransform } from './picture-effects.js';
import { sendFormDataToApi } from './api.js';

const DESCRIPTION_MAX_LENGTH = 140;

const uploadInput = document.getElementById('upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const closeButton = document.getElementById('upload-cancel');
const form = document.getElementById('upload-select-image');
const textArea = document.querySelector('.text__description');
const errorsDiv = document.querySelector('.errors');
const preview = document.querySelector('.img-upload__preview');
const picture = preview.querySelector('img');


const showModal = (item, callback = () => null) => {
  if (!item) {
    return;
  }

  item.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  callback();
};

const closeModal = (item, callback = () => null) => {
  if (!item) {
    return;
  }

  item.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  callback();
};

const setPicture = (input) => {
  const [file] = input.files;
  if (!file) {
    return;
  }

  picture.src = URL.createObjectURL(file);
};

const handleModalKeydown = (evt) => {
  if(evt.key === 'Escape') {
    if (document.querySelector('.error')) {
      closeErrorTemplate();
    }

    if (document.querySelector('.success')) {
      closeSuccessTemplate();
    }
  }
};

const showSuccessTemplate = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const itemElement = successTemplate.cloneNode(true);
  document.body.appendChild(itemElement);
  document.body.addEventListener('keydown', handleModalKeydown);
};

const showErrorTemplate = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const itemElement = errorTemplate.cloneNode(true);
  itemElement.style.zIndex = 2;
  document.body.appendChild(itemElement);
  document.body.addEventListener('keydown', handleModalKeydown);
};

function closeSuccessTemplate() {
  document.querySelector('.success').remove();
  document.body.removeEventListener('keydown', handleModalKeydown);
}

function closeErrorTemplate() {
  document.querySelector('.error').remove();
  document.body.removeEventListener('keydown', handleModalKeydown);
}

const handleFormClosing = () => {
  closeModal(uploadModal, resetForm);
};

const onSuccess = (response) => {
  closeModal(uploadModal, resetForm);
  if (response.status !== 200) {
    throw new Error('Server error');
  }

  showSuccessTemplate();
};

const handleFormKeydown = (evt) => {
  if(evt.key === 'Escape' && textArea !== document.activeElement) {
    closeModal(uploadModal, resetForm);
  }
};

const onError = () => {
  showErrorTemplate();
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  errorsDiv.textContent = '';
  textArea.style.borderWidth = '1px';
  textArea.style.borderColor = 'black';

  if (textArea.value.length > DESCRIPTION_MAX_LENGTH) {
    textArea.style.borderWidth = '4px';
    textArea.style.borderColor = 'red';
    const span = document.createElement('span');
    span.style.display = 'block';
    span.style.color = 'red';
    span.textContent = `Максимальное колличество символов = ${DESCRIPTION_MAX_LENGTH}, у вас ${textArea.value.length}`;
    errorsDiv.appendChild(span);

    return false;
  }

  const formData = new FormData(evt.target);
  sendFormDataToApi(formData, onSuccess, onError);
};

const addFormListeners = () => {
  form.addEventListener('submit', handleFormSubmit);
  closeButton.addEventListener('click', handleFormClosing);
  document.addEventListener('keydown', handleFormKeydown);
};

const removeFormListeners = () => {
  form.removeEventListener('submit', handleFormSubmit);
  closeButton.removeEventListener('click', handleFormClosing);
  document.removeEventListener('keydown', handleFormKeydown);
};

function resetForm() {
  form.reset();
  removeEffect(picture);
  setScaleDefaultValue();
  setPictureTransform(1);
  removeFormListeners();
}

const initUploadModule = () => {
  uploadInput.addEventListener('change', () => {
    setPicture(uploadInput);
    setScaleDefaultValue();
    showModal(uploadModal, addFormListeners);
  });
};

export { initUploadModule, showModal, closeModal, closeErrorTemplate, closeSuccessTemplate };
