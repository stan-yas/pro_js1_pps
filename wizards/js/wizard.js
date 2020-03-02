'use strict';
/* global util, wizard */

(function () {
  window.wizard = {
    NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
      'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYE_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    createSimilar:
      /**
       * Creating a similar Wizard element by Wizard Template element
       * @return {Node} - a similar Wizard element
       */
      function () {
        var wte = document.querySelector('template#similar-wizard-template');
        var we = wte.content.querySelector('.setup-similar-item').cloneNode(true);
        we.querySelector('.setup-similar-label').textContent =
          util.getRandomArrayValue(wizard.NAMES) + ' ' + util.getRandomArrayValue(wizard.SURNAMES);
        we.querySelector('.wizard-coat').style.fill = util.getRandomArrayValue(wizard.COAT_COLORS);
        we.querySelector('.wizard-eyes').style.fill = util.getRandomArrayValue(wizard.EYE_COLORS);
        return we;
      }
  };
})();
