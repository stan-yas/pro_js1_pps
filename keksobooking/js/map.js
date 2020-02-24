'use strict';

var offerTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var offerTypesRus = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var offerCheckIns = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerFotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var offers = [];

/**
 * Page status
 * @type {boolean} - true if Page is active
 */
window.active = false;

/**
 * Page already activated
 * @type {boolean}
 */
window.activated = false;


/**
 * Getting a random integer between two values
 * @param {number} min The minimum is inclusive
 * @param {number} max The maximum is inclusive
 * @return {number} A random integer between the specified values
 */
function getRandomInt(min, max) {
  // min = Math.ceil(min);
  // max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Getting a random value from specified array excluding "notThatValue"
 * @param {Array} arr
 * @param {*} [notThatValue] - don't return that value(optional)
 * @return {*}
 */
function getRandomArrayValue(arr, notThatValue) {
  if (!arr || arr.length === 0) {
    throw Error('not array');
  }
  var value;
  do {
    value = arr[getRandomInt(0, arr.length - 1)];
  } while (notThatValue !== undefined && value === notThatValue);
  return value;
}

function Offer(i) {
  this.id = i;
  this.author = {avatar: 'img/avatars/user0' + (i + 1) + '.png'};
  this.offer = {
    title: offerTitles[i],
    address: getRandomInt(0, 800).toString() + ', ' + getRandomInt(0, 550).toString(),
    price: getRandomInt(1000, 1000000),
    type: getRandomArrayValue(offerTypes),
    rooms: getRandomInt(1, 5),
    guests: getRandomInt(1, 5),
    checkin: getRandomArrayValue(offerCheckIns),
    checkout: getRandomArrayValue(offerCheckIns),
    features: getRandomArrayValue(offerFeatures), // TODO more complex
    description: '',
    photos: getRandomArrayValue(offerFotos) // TODO more complex
  };
}

/**
 * creating .map__pin
 * @param {Offer} offer
 * @param {Node} tMapPin template
 * @return {Node}
 */
function createMapPin(offer, tMapPin) {
  var SHIFT_X = -33 + 260;
  var SHIFT_Y = -55 + 160;
  var mapPin = tMapPin.cloneNode(true);
  mapPin.setAttribute('offer_id', offer.id);
  var location = offer.offer.address.split(',');
  mapPin.style.left = (parseInt(location[0], 10) + SHIFT_X).toString() + 'px';
  mapPin.style.top = (parseInt(location[1], 10) + SHIFT_Y).toString() + 'px';
  var img = mapPin.querySelector('img');
  img.src = offer.author.avatar;
  img.alt = offer.offer.title;
  return mapPin;
}

/**
 * Disable/enable form.notice__form fieldset
 * @param {boolean} [disable] - disable if true
 */
function disableForm(disable) {
  var fieldset = document.querySelectorAll('form.notice__form fieldset');
  for (var j = 0; j < fieldset.length; j++) {
    if (disable === undefined || disable === true) {
      fieldset[j].setAttribute('disabled', '');
    } else {
      fieldset[j].removeAttribute('disabled');
    }
  }
}

function inactivatePage() {
  if (window.active) {
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.notice__form').classList.add('notice__form--disabled');
    disableForm();
    window.active = false;
  }
}

function activatePage() {
  if (!window.active) {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    disableForm(false);
    window.active = true;
    if (!window.activated) {
      window.activated = true;
      renderMapPins();
    }
  }
}

function renderMapPins() {
  var i = 0;
  for (; i < 8; i++) {
    offers.push(new Offer(i));
  }
  // creating map__pins
  var mapPinsFragment = document.createDocumentFragment();
  for (i = 0; i < offers.length; i++) {
    mapPinsFragment.appendChild(createMapPin(offers[i], pinTemplate));
  }
  // render map__pins
  var mapPinsBlock = document.querySelector('.map__pins');
  mapPinsBlock.appendChild(mapPinsFragment);
}

var mouseX; var mouseY;
var draggedObject;

var dragPin = function (evt) {
  if (!draggedObject) {
    draggedObject = evt.currentTarget;
    mouseX = evt.clientX; mouseY = evt.clientY;
    draggedObject.parentNode.addEventListener('mousemove', movePin, true);
    draggedObject.parentNode.addEventListener('mouseup', dropPin, true);
  }
  evt.stopPropagation();
};

var movePin = function (evt) {
  if (draggedObject) {
    draggedObject.style.left = draggedObject.offsetLeft + (evt.clientX - mouseX) + 'px';
    draggedObject.style.top = draggedObject.offsetTop + (evt.clientY - mouseY) + 'px';
    mouseX = evt.clientX;
    mouseY = evt.clientY;
  }
};

var dropPin = function () {
  if (draggedObject) {
    draggedObject.parentNode.removeEventListener('mousemove', movePin, true);
    draggedObject.parentNode.removeEventListener('mouseup', dropPin, true);
    draggedObject = undefined;
    document.querySelector('form.notice__form input#address').value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;
    activatePage();
  }
};

var clickPin = function (evt) {
  if (evt.target.parentElement.className === 'map__pin') {
    showCard(evt.target.parentElement.getAttribute('offer_id'));
  }
};

function showCard(offerID) {
  mapCard.querySelector('.popup__title').textContent = offers[offerID].offer.title;
  mapCard.querySelector('.popup__text--address').textContent = offers[offerID].offer.address;
  mapCard.querySelector('.popup__text--price').textContent = offers[offerID].offer.price + '₽/ночь';
  mapCard.querySelector('.popup__type').textContent = offerTypesRus[offerTypes.indexOf(offers[offerID].offer.type)];
  mapCard.querySelector('.popup__text--capacity').textContent = offers[offerID].offer.rooms + ' комнаты для ' + offers[offerID].offer.guests + ' гостей';
  mapCard.querySelector('.popup__description').textContent = offers[offerID].offer.description;
  mapCard.querySelector('.popup__photos > li > img').src = offers[offerID].offer.photos;

  mapCard.classList.remove('hidden');
}

inactivatePage();

var mainTemplate = document.querySelector('template').content;
var pinTemplate = mainTemplate.querySelector('.map__pin');


var pinsContainer = document.querySelector('.map__pins');
var mainPin = pinsContainer.querySelector('.map__pin--main');

// creating map__card
var mapCard = mainTemplate.querySelector('.map__card').cloneNode(true);
mapCard.classList.add('hidden');
mapCard.querySelector('button.popup__close').addEventListener('click', function () {
  mapCard.classList.add('hidden');
});
// insert map__card
document.querySelector('.map > .map__filters-container').before(mapCard);

mainPin.addEventListener('mousedown', dragPin);
pinsContainer.addEventListener('mousedown', clickPin);

