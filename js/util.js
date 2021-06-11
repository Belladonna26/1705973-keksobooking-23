const getRandomFloatNumber = (min, max, precision) => {
  if(max <= min || min < 0) {
    throw new Error('Введено отрицательное число или максимум меньше минимума');
  }
  const randomFloatNumber = Math.random() * (max-min) + min;
  return parseFloat(randomFloatNumber.toFixed(precision));
};

const getRandomNumber = (min, max) => {
  if(max <= min || min < 0) {
    throw new Error('Введено отрицательное число или максимум меньше минимума');
  }
  return Math.floor(Math.random()  * (max - min + 1) ) + min;
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getRandomArray = (array) => {
  const randomArray = Array.from({length: getRandomNumber(1, array.length)}).map(() => getRandomArrayElement(array));
  return [...new Set(randomArray)];
};

export {getRandomFloatNumber, getRandomNumber, getRandomArrayElement, getRandomArray};
