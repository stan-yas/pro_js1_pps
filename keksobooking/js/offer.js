'use strict';
/* global util, offer, offers */

(function () {
  window.offer = {
    TITLES: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],
    TYPES: ['palace', 'flat', 'house', 'bungalo'],
    TYPES_RUS: ['Дворец', 'Квартира', 'Дом', 'Бунгало'],
    CHECK_INS: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PHOTOS: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ]
  };

  window.offers = [];

  function Offer(j) {
    this.id = j;
    this.author = {avatar: 'img/avatars/user0' + (i + 1) + '.png'};
    this.offer = {
      title: offer.TITLES[i],
      address: util.getRandomInt(0, 800).toString() + ', ' + util.getRandomInt(0, 550).toString(),
      price: util.getRandomInt(1000, 1000000),
      type: util.getRandomArrayValue(offer.TYPES),
      rooms: util.getRandomInt(1, 5),
      guests: util.getRandomInt(1, 5),
      checkin: util.getRandomArrayValue(offer.CHECK_INS),
      checkout: util.getRandomArrayValue(offer.CHECK_INS),
      features: util.getRandomArrayValue(offer.FEATURES), // TODO more complex
      description: '',
      photos: util.getRandomArrayValue(offer.PHOTOS) // TODO more complex
    };
  }

  for (var i = 0; i < 8; i++) {
    offers.push(new Offer(i));
  }
})();
