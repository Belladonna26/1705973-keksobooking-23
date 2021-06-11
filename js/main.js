
import {createAuthor} from './author.js';
import {createOffer} from './offer.js';
import {createLocation} from './location.js';

const AD_COUNT = 10;

const createAd = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation(),
});

const ads = Array.from({length: AD_COUNT}).map(() =>
  createAd());

// eslint-disable-next-line no-console
console.log(ads);

