'use strict';

var COMMENTS = [
  'Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var socialNames = ['facebook', 'twitter', 'vk', 'instagram'/* , 'youtube', 'ok'*/];

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

function generatePictures(pictureObjects, pictureTemplate) {
  var documentFragment = document.createDocumentFragment();
  for (var i = 0; i < pictureObjects.length; i++) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = pictureObjects[i].url;
    pictureElement.querySelector('.picture-likes').textContent = pictureObjects[i].likes.toString();
    pictureElement.querySelector('.picture-comments').textContent = pictureObjects[i].comments.length.toString();
    documentFragment.appendChild(pictureElement);
  }
  return documentFragment;
}

function renderComments(commentsContainer, comments) {
  if (!commentsContainer || comments.length === 0) {
    return;
  }
  // var commentsFragment = document.createDocumentFragment();
  var ul = document.createElement('ul');
  ul.className = 'social__comments';
  for (var i = 0; i < comments.length; i++) {
    var li = document.createElement('li');
    li.className = 'social-comments__comment';
    var icon = document.createElement('div');
    icon.className = 'social-comments-icon social-icon-' + getRandomArrayValue(socialNames);
    // var img = document.createElement('img');
    // // img.className = '';
    // img.src = 'img/' + getRandomArrayValue(socialNames) + '.svg';
    // img.alt = 'Аватар комментатора фотографии';
    // img.width = 35;
    // img.height = 35;
    var p = document.createElement('p');
    p.textContent = comments[i];
    li.appendChild(icon);
    li.appendChild(p);
    ul.appendChild(li);
    // commentsFragment.appendChild(li);
  }
  commentsContainer.appendChild(ul);
  // commentsContainer.appendChild(commentsFragment);
}
var pictures = [];
for (var i = 0; i < 25; i++) {
  pictures.push(new Picture(i + 1));
}
var pictureTemplate = document.querySelector('#picture-template').content;
var pictureElements = generatePictures(pictures, pictureTemplate); // create pictures
document.querySelector('.pictures').appendChild(pictureElements); // render pictures

var galleryOverlay = document.querySelector('.gallery-overlay');
galleryOverlay.classList.remove('hidden'); // show galleryOverlay
galleryOverlay.querySelector('.gallery-overlay-image').src = pictures[0].url;
galleryOverlay.querySelector('.likes-count').textContent = pictures[0].likes.toString();
galleryOverlay.querySelector('.comments-count').textContent = 'комментариев: ' + pictures[0].comments.length.toString();
renderComments(galleryOverlay.querySelector('.gallery-overlay-controls-comments'), pictures[0].comments);
document.querySelector('.comments-count').classList.add('hidden');
// console.log(pictures);
