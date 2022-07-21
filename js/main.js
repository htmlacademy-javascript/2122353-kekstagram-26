import { getRandomItems } from './data.js';
import {drawItemPicture } from './picture.js';
import { drawComment } from './picture.js';
import { COMMENT_VIEW_DEFAULT_COUNT} from './modal-full-picture.js';
import { uploadPicture, showModal, closeModal } from './modul-form.js';
import {
  setScaleDefaultValue,
  changeScaleValue,
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
    const pictureId = parentElement.id ? Number(parentElement.id): null;
    if (pictureId !== null) {
      const currentCommentsCountObject = evt.target.parentElement.querySelector('.current-comments-count');
      let currentComments = Number(currentCommentsCountObject.textContent);
      const comments = items.find((picture) => picture.id === pictureId).comments;
      const allCommentsCount = comments.length;
      const sliceComments = comments.slice(currentComments, currentComments + COMMENT_VIEW_DEFAULT_COUNT);

      sliceComments.forEach((element) => {
        const commentLi = drawComment(parentElement, element);
        parentElement.querySelector('.social__comments').appendChild(commentLi);
        currentComments += 1;
      });

      if (allCommentsCount <= currentComments) {
        parentElement.querySelector('.social__comment-count').classList.add('hidden');
        parentElement.querySelector('.comments-loader').classList.add('hidden');
      }
    }
  }

  if (evt.target.classList.contains('scale__control--smaller')) {
    changeScaleValue();
  }

  if (evt.target.classList.contains('scale__control--bigger')) {
    changeScaleValue(false);
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
