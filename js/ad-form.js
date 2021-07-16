import {HousingType} from './enums.js';
import {showModal} from './modal.js';
import * as fetchers from './fetchers.js';

const MODAL_TIMEOUT = 1500;
const adForm = document.querySelector('.ad-form');


if (adForm === null) {
  throw new Error('Не найден adForm');
}

const housingTypeSelect = adForm.elements.type;
const priceInput = adForm.elements.price;
const roomsSelect = adForm.elements.rooms;
const capacitySelect = adForm.elements.capacity;
const timeinSelect = adForm.elements.timein;
const timeoutSelect = adForm.elements.timeout;
const addressInput = adForm.elements.address;

if (
  housingTypeSelect === null ||
  priceInput === null ||
  roomsSelect === null ||
  capacitySelect === null ||
  timeinSelect === null ||
  timeoutSelect === null ||
  addressInput === null
) {
  throw new Error('В adForm отсутствуют необходимые элементы');
}

/**
 * @readonly
 */
const minPriceByHousingType = {
  [HousingType.palace]: 10000,
  [HousingType.flat]: 1000,
  [HousingType.house]: 5000,
  [HousingType.bungalow]: 0,
  [HousingType.hotel]: 3000,
};

/**
 * @readonly
 */
const capacityByRooms = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

/**
 * @affects adForm
 * @returns {void}
 */
export const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  Array.from(adForm.elements).forEach((element) => {
    element.disabled = true;
  });
};

disableAdForm();

/**
 * @affects adForm
 * @returns {void}
 */
export const enableAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  Array.from(adForm.elements).forEach((element) => {
    element.disabled = false;
  });
};

/**
 * @param {string} rooms
 * @affects capacitySelect
 */
const updateCapacitySelectOptions = (rooms) => {
  const options = Array.from(capacitySelect.children);
  const availableCapacity = capacityByRooms[rooms];

  options.forEach((option) => {
    if (availableCapacity.includes(option.value)) {
      option.hidden = false;
    } else {
      option.hidden = true;
    }
  });
};

/**
 * @param {string} value
 */
export const updateAddressInputValue = (value) => {
  addressInput.value = value;
};

/**
 * @affects priceInput
 * @returns {void}
 */
const handleHousingTypeSelectChange = () => {
  const minPrice = minPriceByHousingType[housingTypeSelect.value];

  priceInput.min = minPrice;
  priceInput.placeholder = minPrice;
};

/**
 * @affects capacitySelect
 * @returns {void}
 */
const handleRoomsSelectChange = () => {
  updateCapacitySelectOptions(roomsSelect.value);
  const availableCapacity = capacityByRooms[roomsSelect.value];
  if (!availableCapacity.includes(capacitySelect.value)) {
    capacitySelect.value = '';
  }
};

/**
 * @affects timeoutSelect
 * @returns {void}
 */
const handleTimeinSelectChange = () => {
  timeoutSelect.value = timeinSelect.value;
};

/**
 * @affects timeinSelect
 * @returns {void}
 */
const handleTimeoutSelectChange = () => {
  timeinSelect.value = timeoutSelect.value;
};

/**
 * @param {FormData} rawAd
 * @returns {void}
 */
const saveAd = (rawAd) => {
  fetchers.saveAd(rawAd)
    .then(() => {
      showModal({
        message: 'Данные отправлены успешно',
      }, MODAL_TIMEOUT);
      adForm.reset();
    })
    .catch(() => {
      showModal({
        message: 'При отправке данных произошла ошибка',
        isError: true,
        buttonParams: {
          text: 'Попробовать ещё раз',
          onClick: () => {
            saveAd();
          },
        },
      });
    });
};

/**
 * @param {Event} evt
 * @returns {void}
 */
export const handleAdFormSubmit = (evt) => {
  evt.preventDefault();

  saveAd(new FormData(adForm));
};

/**
 * @typedef AdFormResetHandler
 * @type {function(): void}
 */

/**
 * @type {AdFormResetHandler[]}
 */
const adFormResetHandlers = [];

/**
 * @param {AdFormResetHandler} handler
 * @returns {void}
 */
export const addAdFormResetHandler = (handler) => {
  adFormResetHandlers.push(handler);
};

/**
 * @returns {void}
 */
const handleAdFormReset = () => {
  if (adFormResetHandlers.length) {
    adFormResetHandlers.forEach((handler) => {
      handler();
    });
  }
};

adForm.addEventListener('submit', handleAdFormSubmit);
adForm.addEventListener('reset', handleAdFormReset);
timeinSelect.addEventListener('change', handleTimeinSelectChange);
timeoutSelect.addEventListener('change', handleTimeoutSelectChange);
housingTypeSelect.addEventListener('change', handleHousingTypeSelectChange);
roomsSelect.addEventListener('change', handleRoomsSelectChange);

updateCapacitySelectOptions(roomsSelect.value);
