import {createAdCard} from './ad-card.js';
import {createAd} from './mocks/ad.js';
import {disableAdForm} from './forms/ad-form.js';
import {disableMapFiltersForm} from './forms/map-filters-form.js';

const mapCanvas = document.querySelector('.map__canvas');

if (mapCanvas === null) {
  throw new Error('Не найден mapCanvas');
}

const ad = createAd();
const adCard = createAdCard(ad);

mapCanvas.appendChild(adCard);

disableAdForm();
disableMapFiltersForm();
