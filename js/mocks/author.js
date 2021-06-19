import {getRandomArrayElement} from '../utils.js';

/**
 * @readonly
 */

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

/**
 * @returns {Author}
 */

export const createAuthor = () => ({
  avatar: getRandomArrayElement(AUTHOR_AVATARS),
});


