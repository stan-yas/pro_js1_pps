'use strict';
/* global popup */

(function () {
  var overlay = document.querySelector('.overlay');
  var buttonOK = document.querySelector('.alert__button');
  var onButtonClickListener;
  window.popup = {
    element: document.querySelector('.alert'),
    open: function (message, onClose) {
      document.querySelector('.alert__message').textContent = message;
      buttonOK.addEventListener('click', onButtonClickListener = function () {
        buttonOK.removeEventListener('click', onButtonClickListener);
        overlay.classList.add('hidden');
        popup.element.classList.add('hidden');
        onClose();
      });
      overlay.classList.remove('hidden');
      popup.element.classList.remove('hidden');
      buttonOK.focus();
    }
  };
})();
