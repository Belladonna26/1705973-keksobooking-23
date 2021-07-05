import {HousingType} from './enums.js';
import {addMapLoadHandler} from './map/map.js';
import {addMainPinMarkerMoveHandler} from './map/map.js';
import {MAP_VIEW_CENTER_COORDINATES} from './map/constants.js';

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
 * @param {Coordinates} coordinates
 * @returns {string}
 */
const formatCoordinatesToString = (coordinates) => `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;

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
 * @affects adForm
 * @returns {void}
 */
const handleMapLoad = () => {
  enableAdForm();
};

/**
 * @param {Coordinates} coordinates
 * @affects addressInput
 * @return {void}
 */
const handleMapPinMarkerMove = (coordinates) => {
  addressInput.value = formatCoordinatesToString(coordinates);
};

timeinSelect.addEventListener('change', handleTimeinSelectChange);
timeoutSelect.addEventListener('change', handleTimeoutSelectChange);
housingTypeSelect.addEventListener('change', handleHousingTypeSelectChange);
roomsSelect.addEventListener('change', handleRoomsSelectChange);
addMapLoadHandler(handleMapLoad);
addMainPinMarkerMoveHandler(handleMapPinMarkerMove);

addressInput.value = formatCoordinatesToString(MAP_VIEW_CENTER_COORDINATES);
updateCapacitySelectOptions(roomsSelect.value);
