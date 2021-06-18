import {createAd} from './mocks/ad.js';

const AD_COUNT = 10;

export const ads = Array.from({length: AD_COUNT}).map(() =>
  createAd());

