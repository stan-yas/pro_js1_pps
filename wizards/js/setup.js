'use strict';

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
  'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

/**
 * Getting a random integer between two values
 * @param {number} min The minimum is inclusive
 * @param {number} max The maximum is inclusive
 * @return {number} A random integer between the specified values
 */
function getRandomInt(min, max) {
  // min = Math.ceil(min);
  // max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Getting a random value from specified array excluding "notThatValue"
 * @param {Array} arr
 * @param {*} notThatValue don't return that value(optional)
 * @return {*}
 */
function getRandomArrayValue(arr, notThatValue) {
  if (!arr || arr.length === 0) {
    throw Error('not array');
  }
  var value;
  do {
    value = arr[getRandomInt(0, arr.length - 1)];
  } while (notThatValue !== undefined && value === notThatValue);
  return value;
}

function Wizard() {
  this.name = getRandomArrayValue(names) + ' ' + getRandomArrayValue(surnames);
  this.coatColor = getRandomArrayValue(coatColors);
  this.eyesColor = getRandomArrayValue(eyesColors);
}

/**
 * Creating a Wizard element by Wizard Template element
 * @param {Wizard} w
 * @param {HTMLTemplateElement} wte Wizard Template element
 * @return {Node}
 */
var createWizardElementByTemplate = function (w, wte) {
  var we = wte.content.querySelector('.setup-similar-item').cloneNode(true);
  we.querySelector('.setup-similar-label').textContent = w.name;
  we.querySelector('.wizard-coat').style.fill = w.coatColor;
  we.querySelector('.wizard-eyes').style.fill = w.eyesColor;
  return we;
};

var wizards = [new Wizard(), new Wizard(), new Wizard(), new Wizard()];
var wizardTemplateElement = document.querySelector('template#similar-wizard-template');
var documentFragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  documentFragment.appendChild(createWizardElementByTemplate(wizards[i], wizardTemplateElement));
}

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
    var newValue = getRandomArrayValue(coatColors, oldValue);
    evt.target.style.fill = newValue;
    setupEl.querySelector('input[name=coat-color]').value = newValue;
  });

setupEl.querySelector('.setup-wizard .wizard-eyes')
  .addEventListener('click', function (evt) {
    var oldValue = window.getComputedStyle(evt.target).fill;
    var newValue = getRandomArrayValue(eyesColors, oldValue);
    evt.target.style.fill = newValue;
    setupEl.querySelector('input[name=eyes-color]').value = newValue;
  });

setupEl.querySelector('.setup-fireball-wrap')
  .addEventListener('click', function (evt) {
    var oldValue = window.getComputedStyle(evt.currentTarget).backgroundColor;
    var newValue = getRandomArrayValue(fireballColors, oldValue);
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
