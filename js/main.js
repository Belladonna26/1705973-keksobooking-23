import {createAdCard} from './ad-card.js';
import {createAd} from './mocks/ad.js';

const mapCanvas = document.querySelector('.map__canvas');

if (mapCanvas === undefined) {
  throw new Error('Не найден mapCanvas');
}

const ad = createAd();
const adCard = createAdCard(ad);

mapCanvas.appendChild(adCard);
