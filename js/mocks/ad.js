import {createAuthor} from './author.js';
import {createOffer} from './offer.js';
import {createLocation} from './location.js';

export const createAd = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation(),
});

