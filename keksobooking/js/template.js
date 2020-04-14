'use strict';

/* global template */

(function () {
  window.template = {};
  template.main = document.querySelector('template').content;
  template.pin = template.main.querySelector('.map__pin');
  template.card = template.main.querySelector('.map__card');
  template.photo = template.main.querySelector('.form__photo');
})();
