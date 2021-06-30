import {createAd} from './mocks/ad.js';
import {createAdCard} from './ad-card.js';
import {disableAdForm} from './ad-form.js';
import {disableMapFiltersForm} from './map-filters-form.js';

const mapCanvas = document.querySelector('.map__canvas');

if (mapCanvas === null) {
  throw new Error('Не найден mapCanvas');
}

const ad = createAd();
const adCard = createAdCard(ad);

mapCanvas.appendChild(adCard);

disableAdForm();
disableMapFiltersForm();
