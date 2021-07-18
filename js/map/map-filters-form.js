import {getAds} from '../state.js';
import {debounce} from '../utils.js';
import {MAP_MAX_PIN_MARKERS} from './constants.js';

const mapFiltersForm = document.querySelector('.map__filters');

if (mapFiltersForm === null) {
  throw new Error('Не найден mapFiltersForm');
}

/**
 * @affects mapFiltersForm
 * @returns {void}
 */
export const disableMapFiltersForm = () => {
  mapFiltersForm.classList.add('map__filters--disabled');
  Array.from(mapFiltersForm.elements).forEach((element) => {
    element.disabled = true;
  });
};

/**
 * @affects mapFiltersForm
 * @returns {void}
 */
export const enableMapFiltersForm = () => {
  mapFiltersForm.classList.remove('map__filters--disabled');
  Array.from(mapFiltersForm.elements).forEach((element) => {
    element.disabled = false;
  });
};

/**
 * @typedef MapFiltersFormChangeHandler
 * @type {function(Ad[]): void}
 */

/**
 * @type {MapFiltersFormChangeHandler[]}
 */
const mapFiltersFormChangeHandlers = [];

/**
  * @param {MapFiltersFormChangeHandler} handler
  * @returns {void}
  */
export const addMapFiltersFormChangeHandler = (handler) => {
  mapFiltersFormChangeHandlers.push(handler);
};

const priceRangeByPriceTier = {
  middle: [10000, 50000],
  low: [0, 10000],
  high: [50000, Infinity],
  any: [-Infinity, Infinity],
};

/**
  * @returns {void}
  */
const handleMapFiltersFormChange = () => {
  const ads = getAds();
  const formData = new FormData(mapFiltersForm);

  const type = formData.get('housing-type');
  const priceTier = formData.get('housing-price');
  const rooms = formData.get('housing-rooms');
  const guests = formData.get('housing-guests');
  const features = formData.getAll('features');

  const filteredAds = ads.slice(0, MAP_MAX_PIN_MARKERS).filter((ad) => {

    if (type !== 'any' && ad.offer.type !== type) {
      return false;
    }

    const [minPrice, maxPrice] = priceRangeByPriceTier[priceTier];

    if (ad.offer.price < minPrice || ad.offer.price > maxPrice) {
      return false;
    }

    if (rooms !== 'any' && ad.offer.rooms !== Number(rooms)) {
      return false;
    }

    if (guests !== 'any' && ad.offer.guests !== Number(guests)) {
      return false;
    }

    if (!ad.offer.features || !features.every((feature) => ad.offer.features.includes(feature))) {
      return false;
    }

    return true;
  });

  if (mapFiltersFormChangeHandlers.length) {
    mapFiltersFormChangeHandlers.forEach((handler) => {
      handler(filteredAds);
    });
  }
};

mapFiltersForm.addEventListener('change', debounce(handleMapFiltersFormChange));
