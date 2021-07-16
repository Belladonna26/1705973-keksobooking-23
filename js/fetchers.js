/**
 * @returns {Promise}
 * @throws {Error}
 */
export const fetchAds = () => fetch('https://23.javascript.pages.academy/keksobooking/data').then((response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Не удалось загрузить предложения');
  }
});

/**
 * @typedef RawAd
 * @type {object}
 * @property {File} [avatar] Изображение пользователя
 * @property {string} title Заголовок предложения
 * @property {string} address Адрес жилья
 * @property {string} price Стоимость аренды
 * @property {string} type Тип жилья
 * @property {string} rooms Количество комнат
 * @property {string} guests Количество гостей
 * @property {string} checkin Время заезда
 * @property {string} checkout Время выезда
 * @property {string[]} features Особенности
 * @property {string} [description] Описание предложения
 * @property {File[]} photos Массив с изображениями предложения
 */

/**
 * @param {FormData} rawAd
 * @returns {Promise}
 * @throws {Error}
 */
export const saveAd = (rawAd) => fetch(
  'https://23.javascript.pages.academy/keksobooking',
  {
    method: 'POST',
    body: rawAd,
  },
).then((response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Не удалось сохранить предложение');
  }
});
