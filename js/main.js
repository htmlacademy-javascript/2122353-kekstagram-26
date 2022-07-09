import { getRandomItems } from './data.js';
import {drawItemPicture } from './picture.js';

const items = getRandomItems();
const itemsFragment = document.createDocumentFragment();
items.forEach((item) => {
  const itemPicture = drawItemPicture(item);
  itemsFragment.appendChild(itemPicture);
});

document.querySelector('.pictures').appendChild(itemsFragment);
