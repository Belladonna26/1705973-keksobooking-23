// function getRandomNumber(min, max) {
//   if(max <= min || min < 0) {
//     throw new Error('Введено отрицательное число или максимум меньше минимума');
//   }
//   return Math.floor(Math.random()  * (max - min + 1) ) + min;
// }

// getRandomNumber();

// function getRandomFloatNumber(min, max, precision) {
//   if(max <= min || min < 0) {
//     throw new Error('Введено отрицательное число или максимум меньше минимума');
//   }
//   const randomFloatNumber = Math.random() * (max-min) + min;
//   return parseFloat(randomFloatNumber.toFixed(precision));
// }

// getRandomFloatNumber(4,25,4);


//module4-task2
const AUTHOR_AVATAR = [
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

const PRICES = [
  5000,
  3500,
  1000,
  1500,
  2000,
  500,
  4300,
  1200,
];

const TYPE_OF_HOUSING = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const ROOMS = [
  1,
  2,
  3,
  4,
  5,
];

const GUESTS = [
  1,
  2,
  3,
  4,
  5,
];

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

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
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

const OBJECT_COUNT = 10;
const getRandomArrayElement = (elements) => elements[_.random(0, elements.length - 1)];

function getRandomFloatNumber(min, max, precision) {
  if(max <= min || min < 0) {
    throw new Error('Введено отрицательное число или максимум меньше минимума');
  }
  const randomFloatNumber = Math.random() * (max-min) + min;
  return parseFloat(randomFloatNumber.toFixed(precision));
}

function getRandomNumber(min, max) {
  if(max <= min || min < 0) {
    throw new Error('Введено отрицательное число или максимум меньше минимума');
  }
  return Math.floor(Math.random()  * (max - min + 1) ) + min;
}

const getRandomArray = (array) => {
  const randomArray = new Array(getRandomNumber(1, array.length)).fill(' ').map(() => (getRandomArrayElement(array)));
  const newRandomElementsArray = [...new Set(randomArray)];
  return newRandomElementsArray;
};

const createAuthor = () => ({
  avatar: getRandomArrayElement(AUTHOR_AVATAR),
});

const createOffer = () => ({
  title: getRandomArrayElement(TITLES),
  address: getRandomArrayElement(ADDRESSES),
  price: getRandomArrayElement(PRICES),
  type: getRandomArrayElement(TYPE_OF_HOUSING),
  rooms: getRandomArrayElement(ROOMS),
  guests: getRandomArrayElement(GUESTS),
  checkin: getRandomArrayElement(CHECKIN),
  checkout: getRandomArrayElement(CHECKOUT),
  features: getRandomArray(FEATURES),
  description: getRandomArrayElement(DESCRIPTION),
  photos: getRandomArray(PHOTOS),
});

const createLocation = () => ({
  lat: getRandomFloatNumber(35.65000,35.70000,5),
  lng: getRandomFloatNumber(139.70000,139.80000,5),
});

const createAd = () => {
  const ad = {
    author: createAuthor(),
    offer: createOffer(),
    location: createLocation(),
  };
  return ad;
};

const lodging = new Array(OBJECT_COUNT).fill(null).map(() =>
  createAd());

// eslint-disable-next-line no-console
console.log(lodging);

