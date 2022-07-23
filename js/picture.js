import { drawItemModal } from './modal-full-picture.js';

const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');

const drawItemPicture = (item) => {
  const itemElement = imageTemplate.cloneNode(true);
  itemElement.querySelector('.picture__img').src = item.url;
  itemElement.querySelector('.picture__info')
    .querySelector('.picture__likes').textContent = item.likes;

  itemElement.querySelector('.picture__info')
    .querySelector('.picture__comments').textContent = item.comments.length;

  const newDrawModal = drawItemModal(item);
  itemElement.appendChild(newDrawModal);

  return itemElement;
};

const drawComment = (itemElement, comment) => {
  const commentLi = itemElement.querySelector('.social__comment').cloneNode(true);
  commentLi.querySelector('.social__picture').src = comment.avatar;
  commentLi.querySelector('.social__picture').alt = comment.name;
  commentLi.querySelector('.social__text').textContent = comment.message;
  commentLi.querySelector('.social__text').style.lineHeight = '1.5';
  return commentLi;
};

export { drawItemPicture, drawComment };
