'use strict';

document.querySelector('.setup').classList.remove('hidden');
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
  'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

/**
 * Getting a random integer between two values
 * @param {number} min The minimum is inclusive
 * @param {number} max The maximum is exclusive
 * @return {*} A random integer between the specified values
 */
function getRandomInt(min, max) {
  // min = Math.ceil(min);
  // max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArrayValue(arr) {
  if (!arr || arr.length === 0) {
    throw Error('not array');
  }
  return arr[getRandomInt(0, arr.length)];
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
// console.log(wizards);
var wizardTemplateElement = document.querySelector('template#similar-wizard-template');
var documentFragment = document.createDocumentFragment();
for (var wizard of wizards) {
  documentFragment.appendChild(createWizardElementByTemplate(wizard, wizardTemplateElement));
}
document.querySelector('.setup-similar-list').appendChild(documentFragment);
document.querySelector('.setup-similar').classList.remove('hidden');

