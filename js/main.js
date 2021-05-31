function getRandomNumber(min, max) {
  if(max <= min || min < 0) {
    throw new Error('Введено отрицательное число или максимум меньше минимума');
  }
  return Math.floor(Math.random()  * (max - min + 1) ) + min;
}

getRandomNumber();

function getRandomFloatNumber(min, max, precision) {
  if(max <= min || min < 0) {
    throw new Error('Введено отрицательное число или максимум меньше минимума');
  }
  const randomFloatNumber = Math.random() * (max-min) + min;
  return parseFloat(randomFloatNumber.toFixed(precision));
}

getRandomFloatNumber();
