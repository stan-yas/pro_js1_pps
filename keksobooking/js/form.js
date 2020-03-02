'use strict';
/* global form */

(function () {
  window.form = document.querySelector('form.notice__form');
  form.fieldset = form.querySelectorAll('fieldset');
  form.enable = function () {
    form.classList.remove('notice__form--disabled');
    for (var j = 0; j < form.fieldset.length; j++) {
      form.fieldset[j].removeAttribute('disabled');
    }
  };
  form.disable = function () {
    form.classList.add('notice__form--disabled');
    for (var j = 0; j < form.fieldset.length; j++) {
      form.fieldset[j].setAttribute('disabled', '');
    }
  };
  /**
   * Setting address at input form
   * @param {String} x
   * @param {String} y
   */
  form.setAddress = function (x, y) {
    form.querySelector('input#address').value = x + ', ' + y;
  };
})();
