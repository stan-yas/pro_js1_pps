'use strict';
/* global map, pin, form, offers, util */

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
          map.renderPins();
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
    },
    renderPins: function () {
      // creating map__pins
      updateFilterFeatures();
      var filteredOffers = offers.filter(pinFilter);
      var mapPinsFragment = document.createDocumentFragment();
      for (var i = 0; i < filteredOffers.length; i++) {
        mapPinsFragment.appendChild(pin.create(filteredOffers[i]));
      }
      // rendering map__pins
      var mapPinsBlock = document.querySelector('.map__pins');
      mapPinsBlock.innerHTML = ''; // delete previous rendered pins
      mapPinsBlock.appendChild(mapPinsFragment);
    },
    filter: document.querySelectorAll('form.map__filters .map__filter'),
    filterFeatures: []
  };

  function updateFilterFeatures() {
    var featuresInputs = document.querySelectorAll('form.map__filters .features input');
    map.filterFeatures = [];
    featuresInputs.forEach(function (value) {
      if (value.checked) {
        map.filterFeatures.push(value.value);
      }
    });
    // console.log('filterFeatures:' + map.filterFeatures);
  }

  function pinFilter(offer) {
    if (map.filter[0].value !== 'any' && offer.offer.type !== map.filter[0].value) {
      return false;
    }
    if (map.filter[1].value === 'low' && offer.offer.price >= 10000) {
      return false;
    }
    if (map.filter[1].value === 'middle' && (offer.offer.price < 10000 || offer.offer.price > 50000)) {
      return false;
    }
    if (map.filter[1].value === 'high' && (offer.offer.price <= 50000)) {
      return false;
    }
    if (map.filter[2].value !== 'any' && offer.offer.rooms < parseInt(map.filter[2].value, 10)) {
      return false;
    }
    if (map.filter[3].value !== 'any' && offer.offer.guests < parseInt(map.filter[3].value, 10)) {
      return false;
    }
    for (var i = 0; i < map.filterFeatures.length; i++) {
      if (offer.offer.features.indexOf(map.filterFeatures[i]) === -1) {
        return false;
      }
    }
    return true;
  }

  var renderPinDebounced = util.debounce(map.renderPins);

  document.querySelector('form.map__filters').addEventListener('change', function (evt) {
    // console.log('change event fired: ' + evt.target.value);
    var delay = 1000; // in milliseconds
    if (evt.target.tagName.toLowerCase() === 'input') {
      delay = 500;
    }
    renderPinDebounced(delay); // calling renderPins function with delay
  });

  form.disable(); // on init
})();
