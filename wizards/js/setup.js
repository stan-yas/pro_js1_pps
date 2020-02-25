'use strict';
/* global util, wizard */

var renderSimilarWizards = function (num) {
  var documentFragment = document.createDocumentFragment();
  for (var i = 0; i < num; i++) {
    documentFragment.appendChild(wizard.createSimilar());
  }
};

var setupEl = document.querySelector('.setup');
var setupOpenEl = document.querySelector('.setup-open');
var setupCloseEl = setupEl.querySelector('.setup-close');
var setupFormEl = setupEl.querySelector('form.setup-wizard-form');

setupEl.querySelector('.setup-similar-list').appendChild(documentFragment);
setupEl.querySelector('.setup-similar').classList.remove('hidden');

// openSetup();

setupOpenEl.addEventListener('click', openSetup);

setupOpenEl.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter'/* || evt.key === 'Space'*/) {
    openSetup();
  }
});

setupCloseEl.addEventListener('click', closeSetup);

setupCloseEl.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closeSetup();
  }
});

setupFormEl.addEventListener('submit', onFormSubmit);

setupEl.querySelector('.setup-wizard .wizard-coat')
  .addEventListener('click', function (evt) {
    var oldValue = window.getComputedStyle(evt.target).fill;
    var newValue = util.getRandomArrayValue(wizard.COAT_COLORS, oldValue);
    evt.target.style.fill = newValue;
    setupEl.querySelector('input[name=coat-color]').value = newValue;
  });

setupEl.querySelector('.setup-wizard .wizard-eyes')
  .addEventListener('click', function (evt) {
    var oldValue = window.getComputedStyle(evt.target).fill;
    var newValue = util.getRandomArrayValue(wizard.EYE_COLORS, oldValue);
    evt.target.style.fill = newValue;
    setupEl.querySelector('input[name=eyes-color]').value = newValue;
  });

setupEl.querySelector('.setup-fireball-wrap')
  .addEventListener('click', function (evt) {
    var oldValue = window.getComputedStyle(evt.currentTarget).backgroundColor;
    var newValue = util.getRandomArrayValue(wizard.FIREBALL_COLORS, oldValue);
    evt.currentTarget.style.backgroundColor = newValue;
    setupEl.querySelector('input[name=fireball-color]').value = newValue;
  });

function openSetup() {
  setupEl.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeyDown, true);
}

function closeSetup() {
  setupEl.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeyDown, true);
}

function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape' && evt.target.className !== 'setup-user-name') {
    closeSetup();
  }
}

function onFormSubmit(evt) {
  evt.currentTarget.action = 'https://js.dump.academy/code-and-magick';
}
