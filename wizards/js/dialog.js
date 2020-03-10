'use strict';
/* global util, wizard, backend, dialog */

(function () {
  window.dialog = {
    element: document.querySelector('.setup'),
    show: function () {
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
    dragging: false
  };

  var openElement = document.querySelector('.setup-open');
  var closeElement = dialog.element.querySelector('.setup-close');
  var formElement = dialog.element.querySelector('form.setup-wizard-form');
  var userPicElement = formElement.querySelector('div.upload input');

  dialog.hide(); // init open dialog listeners

  // render similar wizards
  (function renderWizards(fromServer) {
    var documentFragment = document.createDocumentFragment();
    if (fromServer) {
      // loading wizards data from server
      backend.load(
          function (data) {
            console.log('wizards data loaded from server successfully');
            for (var i = 0; i < 4; i++) {
              documentFragment.appendChild(wizard.createSimilar(data[i]));
            }
            dialog.element.querySelector('.setup-similar-list').appendChild(documentFragment);
          },
          function (errorMsg) {
            console.error(errorMsg);
          });
    } else {
      // generate similar wizards
      for (var i = 0; i < 4; i++) {
        documentFragment.appendChild(wizard.createSimilar());
      }
      dialog.element.querySelector('.setup-similar-list').appendChild(documentFragment);
    }
    dialog.element.querySelector('.setup-similar').classList.remove('hidden');
  })(true); // if true - loading wizards from server, otherwise - generate similar

  // adding event listeners
  closeElement.addEventListener('click', dialog.hide);
  closeElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      dialog.hide();
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

  function showDialogOnEnterKeyDown(evt) {
    if (evt.key === 'Enter') {
      dialog.show();
    }
  }

  function hideDialogOnEscapeKeyDown(evt) {
    if (evt.key === 'Escape' && evt.target.className !== 'setup-user-name') {
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
