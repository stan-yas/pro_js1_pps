'use strict';

(function () {
  var LOAD_URI = 'https://js.dump.academy/keksobooking/data';
  var SAVE_URI = 'https://js.dump.academy/keksobooking';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 10000;
      xhr.onload = function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Произошла ошибка загрузки:' + xhr.statusText);
        }
      };
      xhr.onerror = function () {
        onError('Ошибка сети при загрузке');
      };
      xhr.open('GET', LOAD_URI);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.timeout = 10000;
      xhr.onload = function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Произошла ошибка сохранения данных:\n' + xhr.status);
        }
      };
      xhr.onerror = function () {
        onError('Ошибка сети при сохранении');
      };
      xhr.open('POST', SAVE_URI);
      xhr.send(data);
    }
  };
})();
