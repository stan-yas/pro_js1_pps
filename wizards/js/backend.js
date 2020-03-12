'use strict';

(function () {
  var WIZARDS_LOAD_URI = 'https://js.dump.academy/code-and-magick/data';
  var WIZARDS_SAVE_URI = 'https://js.dump.academy/code-and-magick';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 10000;
      xhr.onload = function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Произошла ошибка загрузки волшебников: ' + xhr.statusText);
        }
      };
      xhr.onerror = function () {
        onError('Ошибка сети при загрузке волшебников');
      };
      xhr.open('GET', WIZARDS_LOAD_URI);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      // xhr.responseType = 'json';
      xhr.timeout = 10000;
      xhr.onload = function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Произошла ошибка сохранения данных: ' + xhr.statusText);
        }
      };
      xhr.onerror = function () {
        onError('Ошибка сети при сохранении волшебников');
      };
      xhr.open('PUT', WIZARDS_SAVE_URI);
      xhr.send(data);
    }
  };
})();
