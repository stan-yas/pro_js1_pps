'use strict';

(function () {
  window.util = {
    getRandomInt:
      /**
       * Getting a random integer between two values
       * @param {number} min The minimum is inclusive
       * @param {number} max The maximum is inclusive
       * @return {number} A random integer between the specified values
       */
      function (min, max) {
      // min = Math.ceil(min);
      // max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
    getRandomArrayValue:
      /**
       * Getting a random value from specified array excluding "notThatValue"
       * @param {Array} arr
       * @param {*} [notThatValue] - don't return that value(optional)
       * @return {*}
       */
      function (arr, notThatValue) {
        if (!arr || arr.length === 0) {
          return null;
        }
        var value;
        do {
          value = arr[this.getRandomInt(0, arr.length - 1)];
        } while (notThatValue !== undefined && value === notThatValue);
        return value;
      }
  };
})();
