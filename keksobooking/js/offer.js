'use strict';
/* global util, backend, offer, offers */

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
    ],
    id: 0
  };

  function Offer(data) {
    this.author = data ? data.author : {avatar: 'img/avatars/user0' + (offer.id + 1) + '.png'};
    this.offer = {
      title: data ? data.offer.title : util.getRandomArrayValue(offer.TITLES),
      address: data ? (data.location.x + ', ' + data.location.y) :
        util.getRandomInt(0, 800).toString() + ', ' + util.getRandomInt(0, 550).toString(),
      price: data ? data.offer.price : util.getRandomInt(1000, 1000000),
      type: data ? data.offer.type : util.getRandomArrayValue(offer.TYPES),
      rooms: data ? data.offer.rooms : util.getRandomInt(1, 5),
      guests: data ? data.offer.guests : util.getRandomInt(1, 5),
      checkin: data ? data.offer.checkin : util.getRandomArrayValue(offer.CHECK_INS),
      checkout: data ? data.offer.checkout : util.getRandomArrayValue(offer.CHECK_INS),
      features: data ? util.getRandomArrayValue(data.offer.features) :
        util.getRandomArrayValue(offer.FEATURES), // TODO more complex
      description: data ? data.offer.description : '',
      photos: data ? util.getRandomArrayValue(data.offer.photos) :
        util.getRandomArrayValue(offer.PHOTOS) // TODO more complex
    };
    this.id = offer.id++;
  }

  window.offers = [];

  // trying to load offers from server
  backend.load(
      // on successful loading
      function (data) {
        window.offers = []; offer.id = 0;
        try {
          for (var i = 0; i < data.length; i++) {
            offers.push(new Offer(data[i]));
          }
          console.log('Успешно получено предложений с сервера: ' + offers.length);
        } catch (e) {
          console.error('Произошла ошибка при создании offers из даннных сервера: ' + e.toString());
          generateOffers();
        }
      },
      // on error -> generate offers
      function (errorMessage) {
        console.error(errorMessage);
        generateOffers();
      }
  );

  function generateOffers() {
    window.offers = []; window.offer.id = 0;
    for (var i = 0; i < 8; i++) {
      offers.push(new Offer());
    }
    console.log('Cгенерировано предложений: ' + offers.length);
  }

})();
