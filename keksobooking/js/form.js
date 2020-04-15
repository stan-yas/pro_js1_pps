'use strict';
/* global form, backend, popup, template */

(function () {
  window.form = document.querySelector('form.notice__form');
  form.fieldset = form.querySelectorAll('fieldset');
  form.photoContainer = form.querySelector('.form__photo-container');
  form.photoUpload = form.photoContainer.querySelector('.upload');
  // form.photos = form.querySelector('.form__photos');
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

  form.addEventListener('reset', function () {
    deletePhotos();
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
  var photoChooser = form.querySelector('.form__photo-container input#images');

  photoChooser.addEventListener('change', function () {
    deletePhotos(); // delete old photos
    var len = photoChooser.files.length > 4 ? 4 : photoChooser.files.length; // no more 4 photos
    for (var i = 0; i < len; i++) {
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
        var photo = template.photo.cloneNode(true);
        photo.src = reader.result;
        form.photoUpload.before(photo);
      });
      reader.readAsDataURL(file);
    }
  }

  function deletePhotos() {
    form.querySelectorAll('.form__photo-container .form__photo').forEach(function (photo) {
      photo.remove();
    });
  }

  // drag-n-drop photos in photoContainer
  var draggedPhoto;

  form.photoContainer.addEventListener('dragstart', function (evt) {
    draggedPhoto = evt.target;
  }, false);

  form.photoContainer.addEventListener('dragover', function (evt) {
    // prevent default to allow drop
    evt.preventDefault();
  }, false);

  form.photoContainer.addEventListener('dragenter', function (evt) {
    // highlight potential drop target when the draggable element enters it
    if (evt.target.className === 'form__photo') {
      evt.target.style.opacity = 0.5;
    }
  }, false);

  form.photoContainer.addEventListener('dragleave', function (evt) {
    // reset potential drop target when the draggable element leaves it
    if (evt.target.className === 'form__photo') {
      evt.target.style.opacity = 1;
    }
  }, false);

  form.photoContainer.addEventListener('drop', function (evt) {
    evt.preventDefault();
    if (evt.target.className === 'form__photo') {
      evt.target.before(draggedPhoto);
      evt.target.style.opacity = 1;
    }
  }, false);

})();
