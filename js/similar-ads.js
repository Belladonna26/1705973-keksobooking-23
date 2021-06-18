import {createOffer} from './mocks/offer.js';
import {createAuthor} from './mocks/author.js';
import {ads} from './ads.js';

const cardTemplate = document.querySelector('#card').content;
const template = cardTemplate.querySelector('.popup');

const map = document.querySelector('.map__canvas');

const similarAds =  ads;
similarAds.forEach((ads) => {
  const clonedTemplateCard = template.cloneNode(true);

  const img = clonedTemplateCard.querySelector('.popup__avatar');
  img.src= createAuthor().avatar;

  clonedTemplateCard.querySelector('.popup__title').textContent = createOffer().title;
  clonedTemplateCard.querySelector('.popup__text--address').textContent = createOffer().address;
  clonedTemplateCard.querySelector('.popup__text--price').textContent = `${createOffer().price  } ₽/ночь`;
  clonedTemplateCard.querySelector('.popup__type').textContent = createOffer().type;
  clonedTemplateCard.querySelector('.popup__text--capacity').textContent = `${createOffer().rooms  } комнаты для ${  createOffer().guests  } гостей`;
  clonedTemplateCard.querySelector('.popup__text--time').textContent = `Заезд после ${  createOffer().checkin  }, выезд до ${  createOffer().checkout}`;


  // ЗНАЮ ЧТО НЕПРАВИЛЬНО
  // clonedTemplateCard.querySelector('.popup__photos');
  // const photo = clonedTemplateCard.querySelector('.popup__photo');
  // photo.src = createOffer().photos;


  clonedTemplateCard.querySelector('.popup__description').textContent = createOffer().description;
  map.appendChild(clonedTemplateCard);
});

console.log(map);


