function getRandom(min, max) {
  if (min >= max ) {
    return `Ошибка! минимальное значение ${min} ,  больше максимального ${max}`;
  }

  if (min < 0) {
    return 'Ошибка! Отрицательное число!';
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


getRandom(1, 4);


function validateMaxLength(message, maxLength) {
  return message.length <= maxLength;
}

validateMaxLength('привет!', 25);
