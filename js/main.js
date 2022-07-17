import { getRandomItems } from './data.js';
import {drawItemPicture } from './picture.js';
import { showModal, closeModal } from './util.js';
import { uploadPicture } from './modul-form.js';

const items = getRandomItems();
const itemsFragment = document.createDocumentFragment();
items.forEach((item) => {
  const itemPicture = drawItemPicture(item);
  itemsFragment.appendChild(itemPicture);
});

document.querySelector('.pictures').appendChild(itemsFragment);

const pictures = document.querySelectorAll('.picture');
pictures.forEach((item) => {
  item.querySelector('.picture__img').addEventListener('click', () => {
    showModal(item.querySelector('.big-picture'));
  });

  item.querySelector('.big-picture__cancel').addEventListener('click', () => {
    closeModal(item.querySelector('.big-picture'));
  });

  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape') {
      closeModal(item.querySelector('.big-picture'));
    }
  });

});

uploadPicture();
