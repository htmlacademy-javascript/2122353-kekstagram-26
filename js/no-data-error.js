
const showErrorModal = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const element = errorTemplate.cloneNode(true);
  const button = element.querySelector('.error__button');
  element.querySelector('.error__title').textContent = 'Ошибка загрузки данных';
  button.textContent = 'Закрыть';

  const handleKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  };

  const handleClick = () => {
    closeModal();
  };

  function closeModal() {
    button.removeEventListener('click', handleClick);
    document.removeEventListener('keydown', handleKeydown);
    document.body.querySelector('.error').remove();
  }

  button.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeydown);

  document.body.appendChild(element);
};

export { showErrorModal };
