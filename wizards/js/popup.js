'use strict';
/* global popup */

(function () {
  var overlay = document.querySelector('.overlay');
  var buttonOK = document.querySelector('.popup__button');
  var onButtonClickListener;
  window.alert = {
    element: document.querySelector('.popup'),
    open: function (message, onClose) {
      document.querySelector('.popup__message').textContent = message;
      buttonOK.addEventListener('click', onButtonClickListener = function () {
        buttonOK.removeEventListener('click', onButtonClickListener);
        overlay.classList.add('hidden');
        alert.element.classList.add('hidden');
        onClose();
      });
      overlay.classList.remove('hidden');
      alert.element.classList.remove('hidden');
      buttonOK.focus();
    }
  };
})();
