import { getDataFromApi } from './api.js';
import { drawItemPicture } from './picture.js';
import { initUploadModule } from './upload-form.js';
import { setScaleDefaultValue } from './picture-effects.js';
import { initEvents } from './events.js';
import { showErrorModal } from './no-data-error.js';


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
    showErrorModal();
  }
})();

