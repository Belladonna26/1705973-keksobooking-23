import {addMainPinMarkerMoveHandler, addMapLoadHandler, initMap, resetMap} from './map/map.js';
import {addAdFormResetHandler, enableAdForm, updateAddressInputValue} from './ad-form.js';
import {formatCoordinatesToString} from './utils.js';

/**
 * @type {MapLoadHandler}
 */
const handleMapLoad = () => {
  enableAdForm();
};

/**
 * @type {MainPinMarkerMoveHandler}
 */
const handleMapPinMarkerMove = (coordinates) => {
  updateAddressInputValue(formatCoordinatesToString(coordinates));
};

/**
 * @type {AdFormResetHandler}
 */
const handleAdFormReset = () => {
  resetMap();
};

addMapLoadHandler(handleMapLoad);
addMainPinMarkerMoveHandler(handleMapPinMarkerMove);
addAdFormResetHandler(handleAdFormReset);

initMap();
