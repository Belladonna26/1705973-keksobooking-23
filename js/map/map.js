import {disableMapFiltersForm, enableMapFiltersForm} from './map-filters-form.js';
import {createAdCard} from './ad-card.js';
import {fetchAds} from '../fetchers.js';
import {showModal} from '../modal.js';
import {MAP_MAX_PIN_MARKERS} from './constants.js';
import {
  MAP_VIEW_CENTER_COORDINATES,
  MAP_VIEW_ZOOM,
  MAP_MAIN_PIN_ICON_URL,
  MAP_PIN_ICON_URL,
  MAP_MAIN_PIN_ICON_SIZE,
  MAP_MAIN_PIN_ANCHOR_SIZE,
  MAP_PIN_ICON_SIZE,
  MAP_PIN_ANCHOR_SIZE
} from './constants.js';

if (L === undefined) {
  throw new Error('Не найден L');
}

disableMapFiltersForm();

/**
 * @typedef MapLoadHandler
 * @type {function(): void}
 */

/**
 * @type {MapLoadHandler[]}
 */
const mapLoadHandlers = [];

/**
 * @param {MapLoadHandler} handler
 * @returns {void}
 */
export const addMapLoadHandler = (handler) => {
  mapLoadHandlers.push(handler);
};

/**
 * @affects mapFiltersForm
 * @returns {void}
 */
const handleMapLoad = () => {
  queueMicrotask(() => {
    if (mapLoadHandlers.length) {
      mapLoadHandlers.forEach((handler) => {
        handler();
      });
    }

    enableMapFiltersForm();
  });
};

const map = L.map('map-canvas')
  .on('load', handleMapLoad)
  .setView(MAP_VIEW_CENTER_COORDINATES, MAP_VIEW_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinMarker = L.marker(
  MAP_VIEW_CENTER_COORDINATES,
  {
    draggable: true,
    icon: L.icon({
      iconUrl: MAP_MAIN_PIN_ICON_URL,
      iconSize: MAP_MAIN_PIN_ICON_SIZE,
      iconAnchor: MAP_MAIN_PIN_ANCHOR_SIZE,
    }),
  },
);

mainPinMarker.addTo(map);

/**
 * @typedef MainPinMarkerMoveHandler
 * @type {function({Coordinates}): void}
 */

/**
 * @type {MainPinMarkerMoveHandler[]}
 */
const mainPinMarkerMoveHandlers = [];

/**
 * @returns {void}
 */
const handleMainPinMarkerMove = () => {
  if (mainPinMarkerMoveHandlers.length) {
    const coordinates = mainPinMarker.getLatLng();

    mainPinMarkerMoveHandlers.forEach((handler) => {
      handler(coordinates);
    });
  }
};

/**
 * @param {MainPinMarkerMoveHandler} handler
 * @returns {void}
 */
export const addMainPinMarkerMoveHandler = (handler) => {
  mainPinMarkerMoveHandlers.push(handler);
};

mainPinMarker.on('move', handleMainPinMarkerMove);

/**
 * @param {Ad} ad
 * @returns {void}
 */
export const renderPinMarker = (ad) => {
  L.marker(
    ad.location,
    {
      icon: L.icon({
        iconUrl: MAP_PIN_ICON_URL,
        iconSize: MAP_PIN_ICON_SIZE,
        iconAnchor: MAP_PIN_ANCHOR_SIZE,
      }),
    },
  ).addTo(map)
    .bindPopup(createAdCard(ad), {keepInView: true});
};

/**
 * @returns {void}
 */
export const resetMap = () => {
  mainPinMarker.setLatLng(MAP_VIEW_CENTER_COORDINATES);
  map.closePopup();
  map.setView(MAP_VIEW_CENTER_COORDINATES, MAP_VIEW_ZOOM);
};

/**
 * @returns {void}
 */
const handleFetchAdsFulfilled = (ads) => {
  ads.slice(0, MAP_MAX_PIN_MARKERS).forEach(renderPinMarker);
};

/**
 * @affects window
 * @affects document
 * @returns {void}
 */
const handleFetchAdsRejected = () => {
  showModal({
    message: 'Что-то пошло не так',
    isError: true,
    buttonParams: {
      text: 'Попробовать ещё раз',
    },
  });
};

fetchAds()
  .then(handleFetchAdsFulfilled)
  .catch(handleFetchAdsRejected);
