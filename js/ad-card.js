import {Feature, HousingType} from './enums.js';
import {pluralize} from './utils.js';

/**
 * @readonly
 */
const featureName = {
  [Feature.wifi]: 'Wi-fi',
  [Feature.dishwasher]: 'Посудомоечная машина',
  [Feature.parking]: 'Парковка',
  [Feature.washer]: 'Стиральная машина',
  [Feature.elevator]: 'Лифт',
  [Feature.conditioner]: 'Кондиционер',
};

/**
 * @readonly
 */
const housingTypeName = {
  [HousingType.palace]: 'Дворец',
  [HousingType.flat]: 'Квартира',
  [HousingType.house]: 'Дом',
  [HousingType.bungalow]: 'Бунгало',
  [HousingType.hotel]: 'Отель',
};

/**
 * @param {Feature} feature
 * @returns {HTMLLIElement}
 */
const createAdCardOfferFeature = (feature) => {
  const adCardOfferFeature = document.createElement('li');
  adCardOfferFeature.classList.add('popup__feature', `popup__feature--${feature}`);

  const adCardOfferFeatureTitle = featureName[feature];

  if (adCardOfferFeatureTitle === undefined) {
    throw new Error('Не удалось извлечь значение из featureName');
  }

  adCardOfferFeature.title = adCardOfferFeatureTitle;
  return adCardOfferFeature;
};

/**
 * @param {Feature[]} features
 * @returns {HTMLUListElement}
 */
const createAdCardOfferFeatures = (features) => {
  const adCardOfferFeatures = document.createElement('ul');
  adCardOfferFeatures.classList.add('popup__features');

  features.forEach((feature) => {
    const adCardOfferFeature = createAdCardOfferFeature(feature);
    adCardOfferFeatures.appendChild(adCardOfferFeature);
  });
  return adCardOfferFeatures;
};

/**
 * @param {string} photo
 * @returns {HTMLImageElement}
 */
const createAdCardOfferPhoto = (photo) => {
  const adCardOfferPhoto = document.createElement('img');

  adCardOfferPhoto.classList.add('popup__photo');
  adCardOfferPhoto.src = photo;
  adCardOfferPhoto.alt = 'Фотография жилья';
  adCardOfferPhoto.width = 45;
  adCardOfferPhoto.height = 40;

  return adCardOfferPhoto;
};

/**
 * @param {string[]} photos
 * @returns {HTMLDivElement}
 */
const createAdCardOfferPhotos = (photos) => {
  const adCardOfferPhotos = document.createElement('div');
  adCardOfferPhotos.classList.add('popup__photos');

  photos.forEach((photo) => {
    const adCardOfferPhoto = createAdCardOfferPhoto(photo);
    adCardOfferPhotos.appendChild(adCardOfferPhoto);
  });
  return adCardOfferPhotos;
};

/**
 * @param {number} price
 * @returns {HTMLPElement}
 */
const createAdCardOfferPrice = (price) => {
  const adCardOfferPrice = document.createElement('p');

  adCardOfferPrice.textContent = `${price} `;

  const adCardOfferPriceRate = document.createElement('span');
  adCardOfferPriceRate.textContent = '₽/ночь';

  adCardOfferPrice.appendChild(adCardOfferPriceRate);

  return adCardOfferPrice;
};

/**
 * @param {number} rooms
 * @param {number} guests
 * @returns {string}
 */
const getAdCardOfferGuestsText = (rooms, guests) => {
  const pluralizedRooms = pluralize(rooms, ['комната', 'комнаты', 'комнат']);
  const pluralizedGuests = pluralize(guests, ['гостя', 'гостей', 'гостей']);

  return `${rooms} ${pluralizedRooms} для ${guests} ${pluralizedGuests}`;
};

/**
 * @param {string} checkin
 * @param {string} checkout
 * @returns {string}
 */
const getAdCardOfferCheckinCheckoutTimeText = (checkin, checkout) => (
  checkin === checkout
    ? `Заезд и выезд в ${checkin}`
    : `Заезд после ${checkin}, выезд до ${checkout}`
);

/**
 * @param {HousingType} type
 * @return {string}
 * @throws {Error}
 */
const getAdCardOfferTypeText = (type) => {
  const adCardOfferTypeText = housingTypeName[type];

  if (adCardOfferTypeText === undefined) {
    throw new Error('Не удалось извлечь значение из housingTypeName');
  }

  return adCardOfferTypeText;
};

/**
 * @param {Ad} ad
 * @returns {Node}
 * @throws {Error}
 */
export const createAdCard = (ad) => {
  const adCard = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);

  if (adCard === undefined) {
    throw new Error('Не найден adCard');
  }

  const adCardAuthorAvatar = adCard.querySelector('.popup__avatar');
  const adCardOfferTitle = adCard.querySelector('.popup__title');
  const adCardOfferAddress = adCard.querySelector('.popup__text.popup__text--address');
  const adCardOfferPrice = adCard.querySelector('.popup__text.popup__text--price');
  const adCardOfferType = adCard.querySelector('.popup__type');
  const adCardOfferGuests = adCard.querySelector('.popup__text.popup__text--capacity');
  const adCardOfferCheckinCheckoutTime = adCard.querySelector('.popup__text.popup__text--time');
  const adCardOfferFeatures = adCard.querySelector('.popup__features');
  const adCardOfferDescription = adCard.querySelector('.popup__description');
  const adCardOfferPhotos = adCard.querySelector('.popup__photo');

  if (
    adCardAuthorAvatar === null ||
    adCardOfferTitle === null ||
    adCardOfferAddress === null ||
    adCardOfferPrice === null ||
    adCardOfferType === null ||
    adCardOfferGuests === null ||
    adCardOfferCheckinCheckoutTime === null ||
    adCardOfferFeatures === null ||
    adCardOfferDescription === null ||
    adCardOfferPhotos === null
  ) {
    throw new Error('В adCard отсутствуют необходимые элементы');
  }

  if(ad.author.avatar === undefined) {
    adCardAuthorAvatar.remove();
  } else {
    adCardAuthorAvatar.src = ad.author.avatar;
  }

  if(ad.offer.title === undefined) {
    adCardOfferTitle.remove();
  } else {
    adCardOfferTitle.textContent = ad.offer.title;
  }

  if(ad.offer.address === undefined) {
    adCardOfferAddress.remove();
  } else {
    adCardOfferAddress.textContent = ad.offer.address;
  }

  if(ad.offer.price) {
    adCardOfferPrice.remove();
  } else {
    adCardOfferPrice.replaceWith(createAdCardOfferPrice(ad.offer.price));
  }

  if(ad.offer.type === undefined) {
    adCardOfferType.remove();
  } else {
    adCardOfferType.textContent = getAdCardOfferTypeText(ad.offer.type);
  }

  if(ad.offer.rooms, ad.offer.guests === undefined) {
    adCardOfferGuests.remove();
  } else {
    adCardOfferGuests.textContent = getAdCardOfferGuestsText(ad.offer.rooms, ad.offer.guests);
  }

  if(ad.offer.checkin, ad.offer.checkout) {
    adCardOfferCheckinCheckoutTime.remove();
  } else {
    adCardOfferCheckinCheckoutTime.textContent = getAdCardOfferCheckinCheckoutTimeText(ad.offer.checkin, ad.offer.checkout);
  }

  if(ad.offer.features === undefined || ad.offer.features.length === 0) {
    adCardOfferFeatures.remove();
  } else {
    adCardOfferFeatures.replaceWith(createAdCardOfferFeatures(ad.offer.features));
  }

  if(ad.offer.description === undefined) {
    adCardOfferDescription.remove();
  } else {
    adCardOfferDescription.textContent = ad.offer.description;
  }

  if(ad.offer.photos === undefined || ad.offer.photos.length === 0) {
    adCardOfferPhotos.remove();
  } else {
    adCardOfferPhotos.replaceWith(createAdCardOfferPhotos(ad.offer.photos));
  }

  return adCard;
};