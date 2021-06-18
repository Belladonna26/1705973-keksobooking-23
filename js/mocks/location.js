import {getRandomFloatNumber} from '../utils.js';

const MIN_LATITUDE = 35.65000;

const MAX_LATITUDE = 35.70000;

const MIN_LONGITUDE = 139.70000;

const MAX_LONGITUDE = 139.80000;

const COORDINATES_PRECISION = 5;

/**
 * @returns {Coordinates}
 */
export const createLocation = () => ({
  lat: getRandomFloatNumber(MIN_LATITUDE, MAX_LATITUDE, COORDINATES_PRECISION),
  lng: getRandomFloatNumber(MIN_LONGITUDE, MAX_LONGITUDE, COORDINATES_PRECISION),
});

