'use strict';
/* global util, wizard, backend, popup */

(function () {

  var setupWizardCoatColor;
  var setupWizardEyesColor;

  window.wizard = {
    element: document.querySelector('.setup-wizard'),
    coat: document.querySelector('.setup-wizard .wizard-coat'),
    eyes: document.querySelector('.setup-wizard .wizard-eyes'),
    fireball: document.querySelector('.setup-fireball-wrap'),
    all: [], // wizards collection
    NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
      'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYE_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    get coatColor() {
      return setupWizardCoatColor; // window.getComputedStyle(wizard.coat).fill;
    },
    set coatColor(color) {
      setupWizardCoatColor = color;
      wizard.coat.style.fill = color;
    },
    get eyesColor() {
      return setupWizardEyesColor; // window.getComputedStyle(wizard.eyes).fill;
    },
    set eyesColor(color) {
      setupWizardEyesColor = color;
      wizard.eyes.style.fill = color;
    },
    set fireballColor(color) {
      wizard.fireball.style.backgroundColor = color;
    },
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
    }
  };

  wizard.getNextCoatColor = util.nextArrayElement(wizard.COAT_COLORS);
  wizard.getNextEyeColor = util.nextArrayElement(wizard.EYE_COLORS);
  wizard.getNextFireballColor = util.nextArrayElement(wizard.FIREBALL_COLORS);

  function Wizard(name, coatColor, eyesColor) {
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

  Wizard.prototype.rate = function () {
    var rate = 0;
    if (this.coatColor === wizard.coatColor) {
      rate += 4;
    }
    if (this.eyesColor === wizard.eyesColor) {
      rate += 2;
    }
    return rate;
  };

  wizard.load(); // initial loading wizards data

})();
