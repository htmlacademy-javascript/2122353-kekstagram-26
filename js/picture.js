import { drawItemModal } from './modal-full-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const drawItemPicture = (post) => {
  const itemElement = pictureTemplate.cloneNode(true);
  itemElement.querySelector('.picture__img').src = post.url;
  itemElement.querySelector('.picture__info')
    .querySelector('.picture__likes').textContent = post.likes;

  itemElement.querySelector('.picture__info')
    .querySelector('.picture__comments').textContent = post.comments.length;

  const newDrawModal = drawItemModal(post);
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
