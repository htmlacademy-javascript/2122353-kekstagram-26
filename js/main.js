import { getDataFromApi } from './api.js';
import {drawItemPicture } from './picture.js';
import { uploadPicture } from './upload-form.js';
import { setScaleDefaultValue } from './picture-effects.js';
import { initEvents } from './events.js';

(async () => {
  try {
    const items = await getDataFromApi();
    const itemsFragment = document.createDocumentFragment();
    items.forEach((item) => {
      const itemPicture = drawItemPicture(item);
      itemsFragment.appendChild(itemPicture);
    });

    document.querySelector('.pictures').appendChild(itemsFragment);
    document.querySelector('.img-upload__effect-level').remove();
    setScaleDefaultValue();
    uploadPicture();
    initEvents(items);
  } catch (err) {
    //
  }
})();

