const TIMEOUT_DELAY = 500;

/**
 * @param {number} min
 * @param {number} max
 * @param {number} precision
 * @return {number}
 * @throws {Error}
 */
export const getRandomFloatNumber = (min, max, precision) => {
  if(max <= min || min < 0) {
    throw new Error('Введено отрицательное число или максимум меньше минимума');
  }
  const randomFloatNumber = Math.random() * (max-min) + min;
  return parseFloat(randomFloatNumber.toFixed(precision));
};

/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 * @throws {Error}
 */
export const getRandomNumber = (min, max) => {
  if(max <= min || min < 0) {
    throw new Error('Введено отрицательное число или максимум меньше минимума');
  }
  return Math.floor(Math.random()  * (max - min + 1) ) + min;
};

/**
 * @template T
 * @param {T[]} elements
 * @return {T}
 */
export const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

/**
 * @template T
 * @param {T[]} array
 * @return {T[]}
 */
export const getRandomArray = (array) => {
  const randomArray = Array.from({length: getRandomNumber(1, array.length)}).map(() => getRandomArrayElement(array));
  return [...new Set(randomArray)];
};

/**
 * @param {number} number
 * @param {string[]} wordForms
 * @return {string}
 */
export const pluralize = (number, wordForms) => {
  const [one, two, many] = wordForms;

  const mod10 = number % 10;
  const mod100 = number % 100;

  switch (true) {
    case mod100 >= 11 && mod100 <= 20:
      return many || two;

    case mod10 > 5:
      return many || two;

    case mod10 === 1:
      return one;

    case mod10 >= 2 && mod10 <= 4:
      return two;

    default:
      return many || two;
  }
};

/**
 * @param {Coordinates} coordinates
 * @returns {string}
 */
export const formatCoordinatesToString = (coordinates) => `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

export const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};
