import { config } from './config.js';
import { drawComment } from './picture.js';

const imageModalSection = document.querySelector('.big-picture');
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

  if (item.comments.length <= config.fullPicture.commentViewDefaultCount) {
    itemElement.querySelector('.social__comment-count').classList.add('hidden');
    itemElement.querySelector('.comments-loader').classList.add('hidden');
  }

  const commentsHtml = document.createElement('div');
  const sliceComments = item.comments.slice(
    0,
    config.fullPicture.commentViewDefaultCount
  );

  sliceComments.forEach((element) => {
    const commentLi = drawComment(itemElement, element);
    commentsHtml.appendChild(commentLi);
  });

  itemElement.querySelector('.social__comments').textContent = '';
  itemElement.querySelector('.social__comments').innerHTML = commentsHtml.innerHTML;

  return itemElement;
};

const showMoreComments = (parentElement, items) => {
  const pictureId = Number(parentElement.id);
  if (!pictureId) {
    return;
  }

  const currentCommentsCountObject = parentElement.querySelector('.current-comments-count');
  let currentComments = Number(currentCommentsCountObject.textContent);
  const comments = items.find((picture) => picture.id === pictureId).comments;
  const allCommentsCount = comments.length;
  const sliceComments = comments.slice(currentComments, currentComments + config.fullPicture.commentViewDefaultCount);
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
};


export { drawItemModal, showMoreComments };
