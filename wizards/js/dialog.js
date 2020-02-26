'use strict';
/* global util, wizard, dialog */

(function () {
  window.dialog = {
    element: document.querySelector('.setup'),
    open: function () {
      dialog.element.classList.remove('hidden');
      document.addEventListener('keydown', onDocumentKeyDown, true);
    },
    close: function () {
      dialog.element.classList.add('hidden');
      document.removeEventListener('keydown', onDocumentKeyDown, true);
    }
  };

  var openElement = document.querySelector('.setup-open');
  var closeElement = dialog.element.querySelector('.setup-close');
  var formElement = dialog.element.querySelector('form.setup-wizard-form');
  var userPicElement = formElement.querySelector('.setup-user-pic');

  // render similar wizards
  var documentFragment = document.createDocumentFragment();
  for (var i = 0; i < 4; i++) {
    documentFragment.appendChild(wizard.createSimilar());
  }
  dialog.element.querySelector('.setup-similar-list').appendChild(documentFragment);
  dialog.element.querySelector('.setup-similar').classList.remove('hidden');

  // adding event listeners
  openElement.addEventListener('click', dialog.open);

  openElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter'/* || evt.key === 'Space'*/) {
      dialog.open();
    }
  });

  closeElement.addEventListener('click', dialog.close);

  closeElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      dialog.close();
    }
  });

  formElement.addEventListener('submit', function (evt) {
    evt.currentTarget.action = 'https://js.dump.academy/code-and-magick';
  });

  dialog.element.querySelector('.setup-wizard .wizard-coat')
    .addEventListener('click', function (evt) {
      var oldValue = window.getComputedStyle(evt.target).fill;
      var newValue = util.getRandomArrayValue(wizard.COAT_COLORS, oldValue);
      evt.target.style.fill = newValue;
      dialog.element.querySelector('input[name=coat-color]').value = newValue;
    });

  dialog.element.querySelector('.setup-wizard .wizard-eyes')
    .addEventListener('click', function (evt) {
      var oldValue = window.getComputedStyle(evt.target).fill;
      var newValue = util.getRandomArrayValue(wizard.EYE_COLORS, oldValue);
      evt.target.style.fill = newValue;
      dialog.element.querySelector('input[name=eyes-color]').value = newValue;
    });

  dialog.element.querySelector('.setup-fireball-wrap')
    .addEventListener('click', function (evt) {
      var oldValue = window.getComputedStyle(evt.currentTarget).backgroundColor;
      var newValue = util.getRandomArrayValue(wizard.FIREBALL_COLORS, oldValue);
      evt.currentTarget.style.backgroundColor = newValue;
      dialog.element.querySelector('input[name=fireball-color]').value = newValue;
    });

  function onDocumentKeyDown(evt) {
    if (evt.key === 'Escape' && evt.target.className !== 'setup-user-name') {
      dialog.close();
    }
  }
})();
