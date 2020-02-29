'use strict';

/* global util */

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

inactivatePage();
