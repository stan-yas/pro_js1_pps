'use strict';
/* global util, wizard, backend, popup */

(function () {
  window.wizard = {
    all: [], // wizards collection
    NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
      'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYE_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    render:
      /**
       * Creating a similar Wizard element by Wizard Template element
       * @param {Object} [wizardData] - wizard data
       * @return {Node} - a similar Wizard element
       */
      function (wizardData) {
        var wte = document.querySelector('template#similar-wizard-template');
        var we = wte.content.querySelector('.setup-similar-item').cloneNode(true);
        if (wizardData) {
          we.querySelector('.setup-similar-label').textContent = wizardData.name;
          we.querySelector('.wizard-coat').style.fill = wizardData.colorCoat;
          we.querySelector('.wizard-eyes').style.fill = wizardData.colorEyes;
        } else {
          we.querySelector('.setup-similar-label').textContent =
            util.getRandomArrayValue(wizard.NAMES) + ' ' + util.getRandomArrayValue(wizard.SURNAMES);
          we.querySelector('.wizard-coat').style.fill = util.getRandomArrayValue(wizard.COAT_COLORS);
          we.querySelector('.wizard-eyes').style.fill = util.getRandomArrayValue(wizard.EYE_COLORS);
        }
        return we;
      },
    load: function () {
      wizard.all = [];
      backend.load(
          function (data) {
            // loading wizards data from server
            for (var i = 0; i < data.length; i++) {
              var w = {
                name: data[i].name,
                colorCoat: data[i].colorCoat,
                colorEyes: data[i].colorEyes
              };
              wizard.all.push(w);
            }
            console.log('wizards data loaded from server successfully');
          },
          function (errorMsg) {
            popup.open(errorMsg, function () {
              // generate similar wizards
              for (var i = 0; i < 8; i++) {
                var w = {
                  name: util.getRandomArrayValue(wizard.NAMES) + ' ' + util.getRandomArrayValue(wizard.SURNAMES),
                  colorCoat: util.getRandomArrayValue(wizard.COAT_COLORS),
                  colorEyes: util.getRandomArrayValue(wizard.EYE_COLORS)
                };
                wizard.all.push(w);
              }
              console.error(errorMsg);
            });
          }
      );
    }
  };
})();
