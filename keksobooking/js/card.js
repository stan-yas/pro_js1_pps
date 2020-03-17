'use strict';

/* global card, template, offer, offers */

(function () {
  window.card = template.card.cloneNode(true);
  card.show = function (offerID) {
    window.card.querySelector('.popup__avatar').src = offers[offerID].author.avatar;
    window.card.querySelector('.popup__title').textContent = offers[offerID].offer.title;
    window.card.querySelector('.popup__text--address').textContent = offers[offerID].offer.address;
    window.card.querySelector('.popup__text--price').textContent = offers[offerID].offer.price + '₽/ночь';
    window.card.querySelector('.popup__type').textContent = offer.TYPES_RUS[offer.TYPES.indexOf(offers[offerID].offer.type)];
    window.card.querySelector('.popup__text--capacity').textContent = offers[offerID].offer.rooms + ' комнаты для ' + offers[offerID].offer.guests + ' гостей';
    window.card.querySelector('.popup__text--time').textContent = 'Заезд после ' + offers[offerID].offer.checkin +
      ', выезд до ' + offers[offerID].offer.checkout;
    // features processing begin >
    var featuresElements = window.card.querySelectorAll('li.feature');
    for (var i = 0; i < featuresElements.length; i++) {
      var featureFound = false;
      for (var y = 0; y < offers[offerID].offer.features.length; y++) {
        if (featuresElements[i].className.indexOf(offers[offerID].offer.features[y]) >= 0) {
          featureFound = true;
          break;
        }
      }
      if (featureFound) {
        featuresElements[i].classList.remove('hidden');
      } else {
        featuresElements[i].classList.add('hidden');
      }
    }
    // features processing end <
    window.card.querySelector('.popup__description').textContent = offers[offerID].offer.description;
    var photos = offers[offerID].offer.photos;
    if (photos !== null) {
      window.card.querySelector('.popup__photos > li > img').src = photos;
    } else {
      window.card.querySelector('.popup__photos > li > img').src = '';
    }
    window.card.classList.remove('hidden');
  };

  card.classList.add('hidden');
  card.querySelector('button.popup__close').addEventListener('click', function () {
    card.classList.add('hidden');
  });
  // insert map__card
  document.querySelector('.map > .map__filters-container').before(card);
})();
