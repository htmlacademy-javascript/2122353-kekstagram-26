import { getRandomItems } from './data.js';
import {drawItemPicture } from './picture.js';
import { drawComment } from './picture.js';
import { COMMENT_VIEW_DEFAULT_COUNT} from './modal-full-picture.js';
import { uploadPicture, showModal, closeModal } from './modul-form.js';
import {
  setScaleDefaultValue,
  increaseScaleValue,
  lowerScaleValue,
  changeFilter,
} from './effects.js';

const items = getRandomItems();
const itemsFragment = document.createDocumentFragment();
items.forEach((item) => {
  const itemPicture = drawItemPicture(item);
  itemsFragment.appendChild(itemPicture);
});

document.querySelector('.pictures').appendChild(itemsFragment);
document.querySelector('.img-upload__effect-level').remove();
setScaleDefaultValue();

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
    const parentElement = evt.target.parentElement;
    const pictureId = Number(parentElement.id);
    if (pictureId) {
      const currentCommentsCountObject = parentElement.querySelector('.current-comments-count');
      let currentComments = Number(currentCommentsCountObject.textContent);
      const comments = items.find((picture) => picture.id === pictureId).comments;
      const allCommentsCount = comments.length;
      const sliceComments = comments.slice(currentComments, currentComments + COMMENT_VIEW_DEFAULT_COUNT);
      const fragment = document.createDocumentFragment();

      sliceComments.forEach((element) => {
        const commentLi = drawComment(parentElement, element);
        fragment.appendChild(commentLi);
        currentComments += 1;
      });

      parentElement.querySelector('.social__comments').appendChild(fragment);

      if (allCommentsCount <= currentComments) {
        parentElement.querySelector('.comments-loader').classList.add('hidden');
      }

      parentElement.querySelector('.current-comments-count').textContent = currentComments;

    }
  }

  if (evt.target.classList.contains('scale__control--smaller')) {
    lowerScaleValue();
  }

  if (evt.target.classList.contains('scale__control--bigger')) {
    increaseScaleValue();
  }

  if (evt.target.classList.contains('effects__radio')) {
    const effect = evt.target.value;
    changeFilter(effect);
  }

});

document.body.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeModal(pictureElement.querySelector('.big-picture'));
  }
});

uploadPicture();
