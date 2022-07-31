import { config } from './config.js';
import { drawComment } from './picture.js';

const imageModalSection = document.querySelector('.big-picture');
const drawItemModal = (post) =>
{
  const element = imageModalSection.cloneNode(true);
  element.querySelector('.big-picture__img').querySelector('img').src = post.url;
  element.querySelector('.likes-count').textContent = post.likes;
  element.querySelector('.comments-count').textContent = post.comments.length;
  element.querySelector('.social__caption').textContent = post.description;
  element.querySelector('.big-picture__social').id = post.id;
  // исправила косяк верстальсщика
  element.querySelector('.social__caption').style.lineHeight = '1.5';

  if (post.comments.length <= config.fullPicture.commentViewDefaultCount) {
    element.querySelector('.social__comment-count').classList.add('hidden');
    element.querySelector('.comments-loader').classList.add('hidden');
  }

  const commentsHtml = document.createElement('div');
  const sliceComments = post.comments.slice(
    0,
    config.fullPicture.commentViewDefaultCount
  );

  sliceComments.forEach((comment) => {
    const commentLi = drawComment(element, comment);
    commentsHtml.appendChild(commentLi);
  });

  element.querySelector('.social__comments').textContent = '';
  element.querySelector('.social__comments').innerHTML = commentsHtml.innerHTML;

  return element;
};

const showMoreComments = (parentElement, posts) => {
  const pictureId = Number(parentElement.id);
  if (!pictureId) {
    return;
  }

  const currentCommentsCountObject = parentElement.querySelector('.current-comments-count');
  let currentComments = Number(currentCommentsCountObject.textContent);
  const comments = posts.find((picture) => picture.id === pictureId).comments;
  const allCommentsCount = comments.length;
  const slicedComments = comments.slice(currentComments, currentComments + config.fullPicture.commentViewDefaultCount);
  const fragment = document.createDocumentFragment();

  slicedComments.forEach((element) => {
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
