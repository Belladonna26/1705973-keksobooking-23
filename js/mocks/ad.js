import {createAuthor} from './author.js';
import {createOffer} from './offer.js';
import {createLocation} from './location.js';

const AD_COUNT = 10;

/**
 * @returns {Ad}
 */
export const createAd = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation(),
});

export const similarAds = new Array(AD_COUNT).fill().map(() => createAd());
