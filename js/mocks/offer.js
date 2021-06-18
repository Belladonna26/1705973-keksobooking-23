import {getRandomNumber, getRandomArrayElement, getRandomArray} from '../utils.js';
import {HousingType, Feature} from '../enums.js';

/**
 * @readonly
 */
const TITLES = [
  'Сдается новый дом в центре Токио',
  'Сдается комната в общежитии',
  'Сдается двухкомнатная квартира в центре',
  'Уютная комната на окраине',
  'Пентхаус посуточно',
  'Квартира на длительный срок со всеми удобствами',
  'Квартира в идеальном состоянии посуточно',
  'Сдается чистая комната в трехкомнатной квартире',
];

/**
 * @readonly
 */
const ADDRESSES = [
  '12,52',
  '45,40',
  '150,25',
  '71,56',
  '34,44',
  '15,30',
  '65,38',
  '71,89',
];

const MIN_PRICE = 500;

const MAX_PRICE = 5000;

/**
 * @readonly
 */
const HOUSING_TYPES = [
  HousingType.palace,
  HousingType.flat,
  HousingType.house,
  HousingType.bungalow,
  HousingType.hotel,
];

const MIN_ROOMS = 1;

const MAX_ROOMS = 5;

const MIN_GUESTS_COUNT = 1;

const MAX_GUESTS_COUNT = 5;

/**
 * @readonly
 */
const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

/**
 * @readonly
 */
const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

/**
 * @readonly
 */
const FEATURES = [
  Feature.wifi,
  Feature.dishwasher,
  Feature.parking,
  Feature.washer,
  Feature.elevator,
  Feature.conditioner,
];

/**
 * @readonly
 */
const DESCRIPTIONS = [
  'Отличное состояние, имеется все для уютного проживания',
  'Рядом метро и вся нужная транспортная развязка. Чистая квартира',
  'Чистая, уютная комната. Идеально подойдет для студентов',
  'Шикарный пентхаус с отличным ремонтом и новой мебелью',
  'Косметический ремонт, спальный район',
];

/**
 * @readonly
 */
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

/**
 * @returns {Offer}
 */
export const createOffer = () => ({
  title: getRandomArrayElement(TITLES),
  address: getRandomArrayElement(ADDRESSES),
  price: getRandomNumber(MIN_PRICE, MAX_PRICE),
  type: getRandomArrayElement(HOUSING_TYPES),
  rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
  guests: getRandomNumber(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT),
  checkin: getRandomArrayElement(CHECKIN),
  checkout: getRandomArrayElement(CHECKOUT),
  features: getRandomArray(FEATURES),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: getRandomArray(PHOTOS),
});

