'use strict';
/* global form, backend, popup */

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

  // form.submitButton = form.querySelector('form__submit');
  form.addEventListener('submit', function (evt) {
    backend.save(new FormData(form),
        // successful saving form data
        function (response) {
          console.log('Данные формы сохранены успешно:\n' + response);
        },
        // unsuccessful saving form data
        function (errorMessage) {
          popup.open(errorMessage, function () {
            console.error(errorMessage);
          });
        }
    );
    evt.preventDefault();
  });
})();
