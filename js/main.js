const AUTHOR_AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
];

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

const HousingType = {
  palace: 'palace',
  flat: 'flat',
  house: 'house',
  bungalow: 'bungalow',
  hotel: 'hotel',
};

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

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const Feature = {
  wifi: 'wifi',
  dishwasher: 'dishwasher',
  parking: 'parking',
  washer: 'washer',
  elevator: 'elevator',
  conditioner: 'conditioner',
};

const FEATURES = [
  Feature.wifi,
  Feature.dishwasher,
  Feature.parking,
  Feature.washer,
  Feature.elevator,
  Feature.conditioner,
];

const DESCRIPTIONS = [
  'Отличное состояние, имеется все для уютного проживания',
  'Рядом метро и вся нужная транспортная развязка. Чистая квартира',
  'Чистая, уютная комната. Идеально подойдет для студентов',
  'Шикарный пентхаус с отличным ремонтом и новой мебелью',
  'Косметический ремонт, спальный район',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const MIN_LATTITUDE = 35.65000;

const MAX_LATTITUDE = 35.70000;

const MIN_LONGTITUDE = 139.70000;

const MAX_LONGTITUDE = 139.80000;

const COORDINATES_PRECISION = 5;

const AD_COUNT = 10;

const getRandomFloatNumber = (min, max, precision) => {
  if(max <= min || min < 0) {
    throw new Error('Введено отрицательное число или максимум меньше минимума');
  }
  const randomFloatNumber = Math.random() * (max-min) + min;
  return parseFloat(randomFloatNumber.toFixed(precision));
};

const getRandomNumber = (min, max) => {
  if(max <= min || min < 0) {
    throw new Error('Введено отрицательное число или максимум меньше минимума');
  }
  return Math.floor(Math.random()  * (max - min + 1) ) + min;
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getRandomArray = (array) => {
  const randomArray = Array.from({length: getRandomNumber(1, array.length)}).map(() => getRandomArrayElement(array));
  return [...new Set(randomArray)];
};

const createAuthor = () => ({
  avatar: getRandomArrayElement(AUTHOR_AVATARS),
});

const createOffer = () => ({
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

const createLocation = () => ({
  lat: getRandomFloatNumber(MIN_LATTITUDE, MAX_LATTITUDE, COORDINATES_PRECISION),
  lng: getRandomFloatNumber(MIN_LONGTITUDE, MAX_LONGTITUDE, COORDINATES_PRECISION),
});

const createAd = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation(),
});

const ads = Array.from({length: AD_COUNT}).map(() =>
  createAd());

// eslint-disable-next-line no-console
console.log(ads);

