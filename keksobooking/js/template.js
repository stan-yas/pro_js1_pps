'use strict';

/* global template */

(function () {
  window.template = {
    main: document.querySelector('template').content,
    pin: template.main.querySelector('.map__pin'),
    card: template.main.querySelector('.map__card')
  };
})();
