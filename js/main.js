import {createAdCard} from './ad-card.js';
import {createAd} from './mocks/ad.js';
import {activateForm} from './activate-form.js';

const mapCanvas = document.querySelector('.map__canvas');

if (mapCanvas === null) {
  throw new Error('Не найден mapCanvas');
}

const ad = createAd();
const adCard = createAdCard(ad);

mapCanvas.appendChild(adCard);

activateForm();
