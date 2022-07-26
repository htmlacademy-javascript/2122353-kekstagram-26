import { showModal, closeModal } from './upload-form.js';
import { showMoreComments } from './modal-full-picture.js';
import {
  increaseScaleValue,
  lowerScaleValue,
  changeFilter,
} from './picture-effects.js';

const initEvents = (items) => {
  let pictureElement;
  document.body.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      pictureElement = evt.target.parentElement;
      showModal(pictureElement.querySelector('.big-picture'));
    }

    if (evt.target.classList.contains('big-picture__cancel')) {
      closeModal(pictureElement.querySelector('.big-picture'));
    }

    if (evt.target.classList.contains('social__comments-loader')) {
      showMoreComments(evt.target.parentElement, items);
    }

    if (evt.target.classList.contains('scale__control--smaller')) {
      lowerScaleValue();
    }

    if (evt.target.classList.contains('scale__control--bigger')) {
      increaseScaleValue();
    }

    if (evt.target.classList.contains('effects__radio')) {
      changeFilter(evt.target.value);
    }

    if (document.querySelector('.success')
      && evt.target.classList.contains('success')
      || evt.target.classList.contains('success__button')) {
      document.querySelector('.success').remove();
    }

    if (document.querySelector('.error')
    && evt.target.classList.contains('error')
    || evt.target.classList.contains('error__button')) {
      document.querySelector('.error').remove();
    }

  });

  document.body.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeModal(pictureElement.querySelector('.big-picture'));
    }
  });
};

export { initEvents };
