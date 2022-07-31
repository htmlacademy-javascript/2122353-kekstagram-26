import { getDataFromApi } from './api.js';
import {drawItemPicture } from './picture.js';
import { initUploadModule } from './upload-form.js';
import { setScaleDefaultValue } from './picture-effects.js';
import { initEvents } from './events.js';

(async () => {
  try {
    const posts = await getDataFromApi();
    const picturesFragment = document.createDocumentFragment();
    posts.forEach((post) => {
      const pictureElement = drawItemPicture(post);
      picturesFragment.appendChild(pictureElement);
    });

    document.querySelector('.pictures').appendChild(picturesFragment);
    document.querySelector('.img-upload__effect-level').remove();
    setScaleDefaultValue();
    initUploadModule();
    initEvents(posts);
  } catch (err) {
    const errorTemplate = document.querySelector('#error').content.querySelector('.error');
    const element = errorTemplate.cloneNode(true);
    const button = element.querySelector('.error__button');

    const handleButtonClick = () => {
      document.body.querySelector('.error').remove();
      button.removeEventListener('click', handleButtonClick);
    };

    element.querySelector('.error__title').textContent = 'Ошибка загрузки данных';
    button.textContent = 'Закрыть';

    button.addEventListener('click', handleButtonClick);
    document.body.appendChild(element);
  }
})();

