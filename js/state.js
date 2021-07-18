/**
 * @type {Ad[]}
 */
let ads = [];

export const getAds = () => ads.slice();

export const setAds = (adsToSet) => {
  ads = adsToSet;
};
