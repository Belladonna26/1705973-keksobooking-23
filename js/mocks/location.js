import {getRandomFloatNumber} from '../utils.js';

const MIN_LATTITUDE = 35.65000;

const MAX_LATTITUDE = 35.70000;

const MIN_LONGTITUDE = 139.70000;

const MAX_LONGTITUDE = 139.80000;

const COORDINATES_PRECISION = 5;

/**
 * @returns {Coordinates}
 */
export const createLocation = () => ({
  lat: getRandomFloatNumber(MIN_LATTITUDE, MAX_LATTITUDE, COORDINATES_PRECISION),
  lng: getRandomFloatNumber(MIN_LONGTITUDE, MAX_LONGTITUDE, COORDINATES_PRECISION),
});

