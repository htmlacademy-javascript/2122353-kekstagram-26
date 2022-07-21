import { drawComment } from './picture.js';

const imageModalSection = document.querySelector('.big-picture');

const COMMENT_VIEW_DEFAULT_COUNT = 5;

const drawItemModal = (item) =>
{
  const itemElement = imageModalSection.cloneNode(true);
  itemElement.querySelector('.big-picture__img').querySelector('img').src = item.url;
  itemElement.querySelector('.likes-count').textContent = item.likes;
  itemElement.querySelector('.comments-count').textContent = item.comments.length;
  itemElement.querySelector('.social__caption').textContent = item.description;
  itemElement.querySelector('.big-picture__social').id = item.id;
  // исправила косяк верстальсщика
  itemElement.querySelector('.social__caption').style.lineHeight = '1.5';

  if (item.comments.length <= COMMENT_VIEW_DEFAULT_COUNT) {
    itemElement.querySelector('.social__comment-count').classList.add('hidden');
    itemElement.querySelector('.comments-loader').classList.add('hidden');
  }

  const commentsHtml = document.createElement('div');
  const sliceComments = item.comments.slice(0, COMMENT_VIEW_DEFAULT_COUNT);
  sliceComments.forEach((element) => {
    const commentLi = drawComment(itemElement, element);
    commentsHtml.appendChild(commentLi);
  });

  itemElement.querySelector('.social__comments').textContent = '';
  itemElement.querySelector('.social__comments').innerHTML = commentsHtml.innerHTML;

  return itemElement;
};


export { drawItemModal, COMMENT_VIEW_DEFAULT_COUNT };
