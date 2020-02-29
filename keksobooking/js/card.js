'use strict';

/* global template, offer, offers */

(function () {
  window.card = template.card.cloneNode(true);
  window.card.show = function (offerID) {
    window.card.querySelector('.popup__title').textContent = offers[offerID].offer.title;
    window.card.querySelector('.popup__text--address').textContent = offers[offerID].offer.address;
    window.card.querySelector('.popup__text--price').textContent = offers[offerID].offer.price + '₽/ночь';
    window.card.querySelector('.popup__type').textContent = offer.TYPES_RUS[offer.TYPES.indexOf(offers[offerID].offer.type)];
    window.card.querySelector('.popup__text--capacity').textContent = offers[offerID].offer.rooms + ' комнаты для ' + offers[offerID].offer.guests + ' гостей';
    window.card.querySelector('.popup__description').textContent = offers[offerID].offer.description;
    window.card.querySelector('.popup__photos > li > img').src = offers[offerID].offer.photos;
    window.card.classList.remove('hidden');
  };
  window.card.classList.add('hidden');
  window.card.querySelector('button.popup__close').addEventListener('click', function () {
    window.card.classList.add('hidden');
  });
  // insert map__card
  document.querySelector('.map > .map__filters-container').before(window.card);
})();
