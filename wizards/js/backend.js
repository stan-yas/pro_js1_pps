'use strict';

(function () {
  var WIZARDS_DATA_URI = 'https://js.dump.academy/code-and-magick/data';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 10000;
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Произошла ошибка загрузки данных: ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Ошибка сети при загрузке wizards');
      });
      xhr.open('GET', WIZARDS_DATA_URI);
      xhr.send();
    },
    save: function (data, onLoad, onError) {

    }
  };
})();
