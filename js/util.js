const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomPositiveInteger(0, elements.length - 1)];

function showModal(item) {
  item.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
}

function closeModal(item) {
  item.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

export { getRandomPositiveInteger, getRandomArrayElement, showModal, closeModal };
