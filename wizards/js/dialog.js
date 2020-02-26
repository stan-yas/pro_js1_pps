'use strict';
/* global util, wizard, dialog */

(function () {
  window.dialog = {
    element: document.querySelector('.setup'),
    open: function () {
      dialog.element.style.left = '50%';
      dialog.element.style.top = '80px';
      dialog.element.classList.remove('hidden');
      openElement.removeEventListener('click', dialog.open);
      openElement.removeEventListener('keydown', function (evt) {
        if (evt.key === 'Enter'/* || evt.key === 'Space'*/) {
          dialog.open();
        }
      });
      document.addEventListener('keydown', onDocumentKeyDown, true);
      document.addEventListener('mousedown', onDocumentMouseDown, true);
    },
    close: function () {
      dialog.element.classList.add('hidden');
      openElement.addEventListener('click', dialog.open);
      openElement.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          dialog.open();
        }
      });
      document.removeEventListener('keydown', onDocumentKeyDown, true);
      document.removeEventListener('mousedown', onDocumentMouseDown, true);
    },
    dragging: false
  };

  var openElement = document.querySelector('.setup-open');
  var closeElement = dialog.element.querySelector('.setup-close');
  var formElement = dialog.element.querySelector('form.setup-wizard-form');
  var userPicElement = formElement.querySelector('div.upload input');

  dialog.close(); // init open dialog listeners

  // render similar wizards
  var documentFragment = document.createDocumentFragment();
  for (var i = 0; i < 4; i++) {
    documentFragment.appendChild(wizard.createSimilar());
  }
  dialog.element.querySelector('.setup-similar-list').appendChild(documentFragment);
  dialog.element.querySelector('.setup-similar').classList.remove('hidden');

  // adding event listeners
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

  function onDocumentMouseDown(evt) {
    if (evt.target === userPicElement) {
      mouse.x = evt.clientX;
      mouse.y = evt.clientY;
      document.addEventListener('mousemove', onDocumentMouseMove, true);
      document.addEventListener('mouseup', onDocumentMouseUp, true);
      evt.stopPropagation();
    }
  }

  var mouse = {
    x: undefined,
    y: undefined
  };

  var onDocumentMouseMove = function (evt) {
    dialog.dragging = true;
    dialog.element.style.left = dialog.element.offsetLeft + (evt.clientX - mouse.x) + 'px';
    dialog.element.style.top = dialog.element.offsetTop + (evt.clientY - mouse.y) + 'px';
    mouse.x = evt.clientX; mouse.y = evt.clientY;
    evt.stopPropagation();
  };

  var onDocumentMouseUp = function (evt) {
    document.removeEventListener('mousemove', onDocumentMouseMove, true);
    document.removeEventListener('mouseup', onDocumentMouseUp, true);
    if (dialog.dragging) {
      var fileInputHandler = function (ev) {
        ev.preventDefault(); // prevent default if dialog dragged before 'mouseup' event
        userPicElement.removeEventListener('click', fileInputHandler);
      };
      userPicElement.addEventListener('click', fileInputHandler);
      dialog.dragging = false;
    }
    evt.stopPropagation();
  };

})();
