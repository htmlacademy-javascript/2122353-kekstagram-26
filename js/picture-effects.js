
import { config } from './config.js';

const scaleControlValue = document.querySelector('.scale__control--value');
const setScaleValue = (value) => {
  scaleControlValue.value = value;
};

const setScaleDefaultValue = () => {
  setScaleValue(`${config.effects.defaultScaleValue}%`);
};

const getScaleCurrentValue = () => parseInt(scaleControlValue.value, 10);
const setPictureTransform = (scale) => {
  document.querySelector('.img-upload__preview > img').style.transform = `scale(${scale})`;
};

const lowerScaleValue = () => {
  const currentValue = getScaleCurrentValue();
  let value = currentValue;
  if (currentValue > config.effects.minScaleValue) {
    value = currentValue - config.effects.defaultScaleValueStep;
  }

  setScaleValue(`${value}%`);
  setPictureTransform(value / 100);
};

const upperScaleValue = () => {
  const currentValue = getScaleCurrentValue();
  let value = currentValue;
  if (currentValue < config.effects.maxScaleValue) {
    value = currentValue + config.effects.defaultScaleValueStep;
  }

  setScaleValue(`${value}%`);
  setPictureTransform(value / 100);
};

const removeEffect = (picture) => {
  config.effects.values.forEach((item) => picture.classList.remove(`effects__preview--${item}`));
};

const changeFilter = (effect) => {
  if (!config.effects.values.includes(effect)) {
    return;
  }

  const preview = document.querySelector('.img-upload__preview');
  const picture = preview.querySelector('img');
  removeEffect(picture);
  picture.classList.add(`effects__preview--${effect}`);
};

export {
  setScaleDefaultValue,
  upperScaleValue,
  lowerScaleValue,
  changeFilter,
  removeEffect,
  setPictureTransform,
};
