import {createAd} from './mocks/ad.js';

const AD_COUNT = 10;

const ads = Array.from({length: AD_COUNT}).map(() =>
  createAd());

// eslint-disable-next-line no-console
console.log(ads);

