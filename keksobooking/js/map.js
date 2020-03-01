'use strict';
/* global map, pin, form */

(function () {
  window.map = {
    /**
     * Map status
     * @type {boolean} - true if Map is active
     */
    active: false,
    /**
     * Map was already activated
     * @type {boolean} - true if Map was activated
     */
    activated: false,
    activatePage: function () {
      if (!map.active) {
        document.querySelector('.map').classList.remove('map--faded');
        // document.querySelector('.notice__form').classList.remove('notice__form--disabled');
        form.enable();
        map.active = true;
        if (!map.activated) {
          map.activated = true;
          pin.renderAll();
        }
      }
    },
    inactivatePage: function () {
      if (map.active) {
        document.querySelector('.map').classList.add('map--faded');
        // document.querySelector('.notice__form').classList.add('notice__form--disabled');
        form.disable();
        map.active = false;
      }
    }
  };
  form.disable(); // on init
})();
