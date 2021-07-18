import {disableMapFiltersForm, enableMapFiltersForm, addMapFiltersFormChangeHandler} from './map-filters-form.js';
import {createAdCard} from './ad-card.js';
import {fetchAds} from '../fetchers.js';
import {showModal} from '../modal.js';
import {
  MAP_MAX_PIN_MARKERS,
  MAP_VIEW_CENTER_COORDINATES,
  MAP_VIEW_ZOOM,
  MAP_MAIN_PIN_ICON_URL,
  MAP_PIN_ICON_URL,
  MAP_MAIN_PIN_ICON_SIZE,
  MAP_MAIN_PIN_ANCHOR_SIZE,
  MAP_PIN_ICON_SIZE,
  MAP_PIN_ANCHOR_SIZE
} from './constants.js';
import {setAds, getAds} from '../state.js';

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
  if (mapLoadHandlers.length) {
    mapLoadHandlers.forEach((handler) => {
      handler();
    });
  }

  enableMapFiltersForm();
};

const map = L.map('map-canvas')
  .on('load', handleMapLoad);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

let markersLayerGroup;

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
 * @affects map
 * @affects markersLayerGroup
 * @return {void}
 */
export const removePinMarkers = () => {
  if (!markersLayerGroup) {
    return;
  }

  map.removeLayer(markersLayerGroup);

  markersLayerGroup = undefined;
};

window.removePinMarkers = removePinMarkers;

/**
 * @param {Ad} ad
 * @returns {void}
 * @throws {Error}
 */
export const renderPinMarker = (ad) => {
  if (!markersLayerGroup) {
    throw new Error('Отсутствует слой для меток');
  }

  L.marker(
    ad.location,
    {
      icon: L.icon({
        iconUrl: MAP_PIN_ICON_URL,
        iconSize: MAP_PIN_ICON_SIZE,
        iconAnchor: MAP_PIN_ANCHOR_SIZE,
      }),
    },
  ).addTo(markersLayerGroup)
    .bindPopup(createAdCard(ad), {keepInView: true});
};

/**
 * @param {Ad[]} ads
 * @returns {void}
 */
const renderPinMarkers = (ads) => {
  if (markersLayerGroup) {
    removePinMarkers();
  }

  markersLayerGroup = L.layerGroup();

  ads.forEach(renderPinMarker);

  map.addLayer(markersLayerGroup);
};

/**
 * @returns {void}
 */
export const resetMap = () => {
  mainPinMarker.setLatLng(MAP_VIEW_CENTER_COORDINATES);
  map.closePopup();
  map.setView(MAP_VIEW_CENTER_COORDINATES, MAP_VIEW_ZOOM);
};

export const fetchAndRenderAds = () => {
  fetchAds()
    .then((ads) => {
      setAds(ads);
      renderPinMarkers(
        getAds().slice(0, MAP_MAX_PIN_MARKERS),
      );
    })
    .catch(() => {
      showModal({
        message: 'Что-то пошло не так',
        isError: true,
        buttonParams: {
          text: 'Попробовать ещё раз',
          onClick: () => {
            fetchAndRenderAds();
          },
        },
      });
    });
};


/**
 * @type {MapFiltersFormChangeHandler}
 */
const handleMapFiltersFormChange = (ads) => {
  renderPinMarkers(ads);
};

addMapFiltersFormChangeHandler(handleMapFiltersFormChange);

/**
 * Инициализация модуля карты.
 * Вынесена в отдельную функцию для того, чтобы модули аналогичного уровня успели подписаться на событие прежде, чем эти
 * события возникнут
 * @returs {void}
 */
export const initMap = () => {
  /**
   * Вызов setView здесь обусловлен тем, что он сразу создает событие load, из-за чего, модули, подписавшиеся на него,
   * не будут оповещены об этом
   */
  map.setView(MAP_VIEW_CENTER_COORDINATES, MAP_VIEW_ZOOM);
  fetchAndRenderAds();
};
