'use strict';

var COMMENTS = [
  'Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

/**
 * Getting a random integer between two values
 * @param {number} min The minimum is inclusive
 * @param {number} max The maximum is inclusive
 * @return {*} A random integer between the specified values
 */
function getRandomInt(min, max) {
  // min = Math.ceil(min);
  // max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayValue(arr) {
  if (!arr || arr.length === 0) {
    throw Error('not array');
  }
  return arr[getRandomInt(0, arr.length - 1)];
}

function Picture(i) {
  this.url = 'photos/' + i + '.jpg';
  this.likes = getRandomInt(15, 201);
  this.comments = (function () {
    var c = [];
    for (var l = getRandomInt(1, 2); l > 0; l--) {
      c.push(getRandomArrayValue(COMMENTS));
    }
    return c;
  })();
}

var pictures = [];
for (var i = 0; i < 5; i++) {
  pictures.push(new Picture(i + 1));
}

console.log(pictures);
