import { getRandomItems } from './data.js';
import { } from './picture.js';

const items = getRandomItems();
const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const itemsFragment = document.createDocumentFragment();
items.forEach((item) => {
  const itemElement = imageTemplate.cloneNode(true);
  itemElement.querySelector('.picture__img').src = item.url;
  itemElement.querySelector('.picture__info')
    .querySelector('.picture__likes').textContent = item.likes;

  itemElement.querySelector('.picture__info')
    .querySelector('.picture__comments').textContent = item.comments.length;

  itemsFragment.appendChild(itemElement);
});

document.querySelector('.pictures').appendChild(itemsFragment);
