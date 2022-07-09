const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');

function drawItemPicture(item) {
  const itemElement = imageTemplate.cloneNode(true);
  itemElement.querySelector('.picture__img').src = item.url;
  itemElement.querySelector('.picture__info')
    .querySelector('.picture__likes').textContent = item.likes;

  itemElement.querySelector('.picture__info')
    .querySelector('.picture__comments').textContent = item.comments.length;

  return itemElement;
}

export { drawItemPicture };
