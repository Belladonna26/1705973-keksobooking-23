import {disableAdForm, enableAdForm} from './ad-form.js';
import {disableMapFiltersForm, enableMapFiltersForm} from './map-filters-form.js';
import {similarAds} from './mocks/ad.js';
import {createAdCard} from './ad-card.js';

disableAdForm();
disableMapFiltersForm();

/**
 * @readonly
 */
const ZOOM = 10;

const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    enableAdForm();
    enableMapFiltersForm();
  })
  .setView({
    lat: 35.41220,
    lng: 139.41300,
  },
  ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

/**
 * @readonly
 */
const mainPinIcon = L.icon(
  {
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
);

const mainPinMarker = L.marker(
  {
    lat: 35.4122,
    lng: 139.4130,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

const addressByDefault = mainPinMarker.getLatLng();
address.value = `${addressByDefault.lat.toFixed(5)}, ${addressByDefault.lng.toFixed(5)}`;

/**
 * @returns {void}
 */
mainPinMarker.on('move', (evt) => {
  const newAddress = evt.target.getLatLng();
  address.value = `${newAddress.lat.toFixed(5)}, ${newAddress.lng.toFixed(5)}`;
});

/**
 *
 * @param {Ad} point
 * @returns {NewMarkerForAd}
 */
const createRegularMarker = (point) => {
  const regularPinIcon = L.icon(
    {
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

  const regularPinMarker = L.marker(
    point.location,
    {
      icon: regularPinIcon,
    },
  ).addTo(map)
    .bindPopup(createAdCard(point),
      {
        keepInView: true,
      });
  return regularPinMarker;
};

/**
 * @param {object} similarAd
 * @returns {NewMarkersForAds}
 */
similarAds.forEach((similarAd) => {
  createRegularMarker(similarAd);
});
