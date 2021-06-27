import {HousingType} from './enums.js';

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

if (
  housingTypeSelect === null ||
  priceInput === null ||
  roomsSelect === null ||
  capacitySelect === null ||
  timeinSelect === null ||
  timeoutSelect === null
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

timeinSelect.addEventListener('change', handleTimeinSelectChange);
timeoutSelect.addEventListener('change', handleTimeoutSelectChange);
housingTypeSelect.addEventListener('change', handleHousingTypeSelectChange);
roomsSelect.addEventListener('change', handleRoomsSelectChange);

updateCapacitySelectOptions(roomsSelect.value);
