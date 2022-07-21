import { getRandomItems } from './data.js';
import {drawItemPicture } from './picture.js';
import { uploadPicture, showModal, closeModal} from './modul-form.js';

const items = getRandomItems();
const itemsFragment = document.createDocumentFragment();
items.forEach((item) => {
  const itemPicture = drawItemPicture(item);
  itemsFragment.appendChild(itemPicture);
});

document.querySelector('.pictures').appendChild(itemsFragment);

let pictureElement;
document.body.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    pictureElement = evt.target.parentElement;
    showModal(pictureElement.querySelector('.big-picture'));
  }

  if (evt.target.classList.contains('big-picture__cancel')) {
    closeModal(pictureElement.querySelector('.big-picture'));
  }
});

document.body.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeModal(pictureElement.querySelector('.big-picture'));
  }
});

uploadPicture();
