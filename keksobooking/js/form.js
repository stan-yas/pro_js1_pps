'use strict';
/* global form, backend, popup */

(function () {
  window.form = document.querySelector('form.notice__form');
  form.fieldset = form.querySelectorAll('fieldset');
  form.enable = function () {
    form.classList.remove('notice__form--disabled');
    for (var j = 0; j < form.fieldset.length; j++) {
      form.fieldset[j].removeAttribute('disabled');
    }
  };

  form.disable = function () {
    form.classList.add('notice__form--disabled');
    for (var j = 0; j < form.fieldset.length; j++) {
      form.fieldset[j].setAttribute('disabled', '');
    }
  };

  /**
   * Setting address at input form
   * @param {String} x
   * @param {String} y
   */
  form.setAddress = function (x, y) {
    form.querySelector('input#address').value = x + ', ' + y;
  };

  // form.submitButton = form.querySelector('form__submit');
  form.addEventListener('submit', function (evt) {
    backend.save(new FormData(form),
        // successful saving form data
        function (response) {
          console.log('Данные формы сохранены успешно:\n' + response);
          form.reset();
        },
        // unsuccessful saving form data
        function (errorMessage) {
          popup.open(errorMessage, function () {
            console.error(errorMessage);
          });
        }
    );
    evt.preventDefault();
  });

  // avatar picture processing
  var FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];
  var avatarChooser = form.querySelector('input#avatar');
  var avatar = form.querySelector('.notice__preview img');
  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var match = FILE_TYPES.some(function (value) {
      return file.name.toLowerCase().endsWith(value);
    });
    if (match) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatar.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  // photo processing
  form.photoContainer = form.querySelector('.form__photo-container');
  var photoChooser = form.photoContainer.querySelector('input#images');
  photoChooser.addEventListener('change', function () {
    for (var i = 0; i < photoChooser.files.length; i++) {
      filePhotoProcessing(photoChooser.files[i]);
    }
  });

  function filePhotoProcessing(file) {
    var match = FILE_TYPES.some(function (value) {
      return file.name.toLowerCase().endsWith(value);
    });
    if (match) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        // avatar.src = reader.result;
        console.log('filename = ' + file.name);
      });
      reader.readAsDataURL(file);
    }
  }

})();
