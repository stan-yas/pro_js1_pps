'use strict';
/* global wizard, backend, dialog, util*/

(function () {
  window.dialog = {
    element: document.querySelector('.setup'),
    show: function () {
      dialog.updateWizards();
      dialog.element.style.left = '50%';
      dialog.element.style.top = '80px';
      dialog.element.classList.remove('hidden');
      openElement.removeEventListener('click', dialog.show);
      openElement.removeEventListener('keydown', showDialogOnEnterKeyDown);
      document.addEventListener('keydown', hideDialogOnEscapeKeyDown, true);
      document.addEventListener('mousedown', dragDialogOnMouseDown, true);
    },
    hide: function () {
      dialog.element.classList.add('hidden');
      openElement.addEventListener('click', dialog.show);
      openElement.addEventListener('keydown', showDialogOnEnterKeyDown);
      document.removeEventListener('keydown', hideDialogOnEscapeKeyDown, true);
      document.removeEventListener('mousedown', dragDialogOnMouseDown, true);
    },
    /** Flag of Dialog element dragging
     * @type {boolean}
     */
    dragging: false,
    // render wizards
    renderWizards: function () {
      var setupSimilar = dialog.element.querySelector('.setup-similar');
      var similarList = setupSimilar.querySelector('.setup-similar-list');
      similarList.innerHTML = '';
      var documentFragment = document.createDocumentFragment();
      for (var i = 0; i < 4; i++) {
        documentFragment.appendChild(wizard.all[i].render());
      }
      similarList.appendChild(documentFragment);
      setupSimilar.classList.remove('hidden');
    },
    updateWizards: function () {
      wizard.all.sort(compareWizards);
      dialog.renderWizards();
    }
  };

  var debounceUpdateWizards = util.debounce(dialog.updateWizards);
  var openElement = document.querySelector('.setup-open');
  var closeElement = dialog.element.querySelector('.setup-close');
  var formElement = dialog.element.querySelector('form.setup-wizard-form');
  var userPicElement = formElement.querySelector('div.upload input');

  dialog.hide(); // init open dialog listeners
  wizard.coatColor = wizard.getNextCoatColor(); // setting initial coat color of Setup Wizard
  wizard.eyesColor = wizard.getNextEyeColor(); // setting initial eyes color of Setup Wizard
  wizard.fireballColor = wizard.getNextFireballColor(); // setting initial fireball color of Setup Wizard

  // adding event listeners
  closeElement.addEventListener('click', dialog.hide);
  closeElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      dialog.hide();
    }
  });

  dialog.element.querySelector('.setup-wizard .wizard-coat')
    .addEventListener('click', function () {
      var nextColor = wizard.getNextCoatColor();
      wizard.coatColor = nextColor;
      // evt.target.style.fill = nextColor;
      dialog.element.querySelector('input[name=coat-color]').value = nextColor;
      debounceUpdateWizards(500); // dialog.updateWizards();
    });

  dialog.element.querySelector('.setup-wizard .wizard-eyes')
    .addEventListener('click', function () {
      var nextColor = wizard.getNextEyeColor();
      wizard.eyesColor = nextColor;
      // evt.target.style.fill = nextColor;
      dialog.element.querySelector('input[name=eyes-color]').value = nextColor;
      debounceUpdateWizards(500); // dialog.updateWizards();
    });

  dialog.element.querySelector('.setup-fireball-wrap')
    .addEventListener('click', function () {
      var nextColor = wizard.getNextFireballColor();
      wizard.fireballColor = nextColor;
      dialog.element.querySelector('input[name=fireball-color]').value = nextColor;
    });

  formElement.addEventListener('submit', function (evt) {
    // prepare Form data to save
    var formData = new FormData(formElement);
    // save Form data to server
    backend.save(formData,
        function (response) {
          console.log('Данные успешно загружены на сервер:\n' + response);
          dialog.hide();
        },
        function (errorMessage) {
          alert.open(errorMessage, function () {
            console.error(errorMessage);
          });
        }
    );
    evt.preventDefault();
  });

  function compareWizards(a, b) {
    var diff = b.rate() - a.rate();
    if (diff === 0) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }
    if (diff > 0) {
      return 1;
    }
    return -1;
  }

  function showDialogOnEnterKeyDown(evt) {
    if (evt.key === 'Enter') {
      dialog.show();
    }
  }

  function hideDialogOnEscapeKeyDown(evt) {
    if (evt.key === 'Escape' && evt.target.className !== 'setup-user-name'
      && evt.target.className.indexOf('setup') >= 0 /* only element containing `setup` in className*/) {
      dialog.hide();
    }
  }

  var mouse = {
    x: undefined,
    y: undefined
  };

  function dragDialogOnMouseDown(evt) {
    if (evt.target === userPicElement) {
      mouse.x = evt.clientX;
      mouse.y = evt.clientY;
      document.addEventListener('mousemove', moveDialogOnMouseMove, true);
      document.addEventListener('mouseup', dropDialogOnMouseUp, true);
      evt.stopPropagation();
    }
  }

  function moveDialogOnMouseMove(evt) {
    dialog.dragging = true;
    dialog.element.style.left = dialog.element.offsetLeft + (evt.clientX - mouse.x) + 'px';
    dialog.element.style.top = dialog.element.offsetTop + (evt.clientY - mouse.y) + 'px';
    mouse.x = evt.clientX;
    mouse.y = evt.clientY;
    evt.stopPropagation();
  }

  function dropDialogOnMouseUp(evt) {
    document.removeEventListener('mousemove', moveDialogOnMouseMove, true);
    document.removeEventListener('mouseup', dropDialogOnMouseUp, true);
    if (dialog.dragging) {
      var fileInputHandler = function (ev) {
        ev.preventDefault(); // prevent default if dialog dragged before 'mouseup' event
        userPicElement.removeEventListener('click', fileInputHandler);
      };
      userPicElement.addEventListener('click', fileInputHandler);
      dialog.dragging = false;
    }
    evt.stopPropagation();
  }

})();
