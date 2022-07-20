const imageModalSection = document.querySelector('.big-picture');

const drawItemModal = (item) =>
{
  const itemElement = imageModalSection.cloneNode(true);
  itemElement.querySelector('.big-picture__img').querySelector('img').src = item.url;
  itemElement.querySelector('.likes-count').textContent = item.likes;
  itemElement.querySelector('.comments-count').textContent = item.comments.length;
  itemElement.querySelector('.social__caption').textContent = item.description;
  // исправила косяк верстальсщика
  itemElement.querySelector('.social__caption').style.lineHeight = '1.5';
  itemElement.querySelector('.social__comment-count').classList.add('hidden');
  itemElement.querySelector('.comments-loader').classList.add('hidden');


  const commentsHtml = document.createElement('div');

  item.comments.forEach((comment) => {
    const commentLi = itemElement.querySelector('.social__comment').cloneNode(true);
    commentLi.querySelector('.social__picture').src = comment.avatar;
    commentLi.querySelector('.social__picture').alt = comment.name;
    commentLi.querySelector('.social__text').textContent = comment.message;
    commentLi.querySelector('.social__text').style.lineHeight = '1.5';
    commentsHtml.appendChild(commentLi);
  });

  itemElement.querySelector('.social__comments').textContent = '';
  itemElement.querySelector('.social__comments').innerHTML = commentsHtml.innerHTML;

  return itemElement;
};


export { drawItemModal };
