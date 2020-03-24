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
    load: function () {
      wizard.all = [];
      backend.load(
          function (data) {
            // loading wizards data from server
            for (var i = 0; i < data.length; i++) {
              var w = new Wizard(data[i].name, data[i].colorCoat, data[i].colorEyes);
              wizard.all.push(w);
            }
            console.log('wizards data loaded from server successfully');
          },
          function (errorMsg) {
            popup.open(errorMsg, function () {
              // generate similar wizards
              for (var i = 0; i < 8; i++) {
                wizard.all.push(new Wizard());
              }
              console.error(errorMsg);
              console.log('wizards are generated');
            });
          }
      );
    },
    rate: function (coatColor, eyesColor) {
      for (var i = 0; i < wizard.all.length; i++) {
        var w = wizard.all[i];
        w.rate = 0;
        if (w.coatColor === coatColor) {
          w.rate += 2;
        }
        if (w.eyesColor === eyesColor) {
          w.rate += 1;
        }
      }
    }
  };

  function Wizard(name, coatColor, eyesColor) {
    this.rate = 0;
    if (!arguments[0]) {
      this.name = util.getRandomArrayValue(wizard.NAMES) + ' ' + util.getRandomArrayValue(wizard.SURNAMES);
    } else {
      this.name = name;
    }
    if (!arguments[1]) {
      this.coatColor = util.getRandomArrayValue(wizard.COAT_COLORS);
    } else {
      this.coatColor = coatColor;
    }
    if (!arguments[2]) {
      this.eyesColor = util.getRandomArrayValue(wizard.EYE_COLORS);
    } else {
      this.eyesColor = eyesColor;
    }
  }

  /**
   * Creating a similar Wizard element by Wizard Template element
   * @return {Node} - a similar Wizard element
   */
  Wizard.prototype.render = function () {
    var wte = document.querySelector('template#similar-wizard-template');
    var we = wte.content.querySelector('.setup-similar-item').cloneNode(true);
    we.querySelector('.setup-similar-label').textContent = this.name;
    we.querySelector('.wizard-coat').style.fill = this.coatColor;
    we.querySelector('.wizard-eyes').style.fill = this.eyesColor;
    return we;
  };

  wizard.load();

})();
