'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var GIST_HEIGHT = 150;

/**
 * Print multiline message
 * @param {String} m  - Message to print
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x  - x-coordinate
 * @param {number} y  - y-coordinate
 */
var printMessage = function (m, ctx, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  m.split('\n').forEach(function (line, i) {
    ctx.fillText(line, x, y + (FONT_GAP + 10) * i);
  });
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = Math.round(arr[0]);
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = Math.round(arr[i]);
    }
  }
  return maxElement;
};

var getDecimalRandom = function () {
  var a;
  do {
    a = Math.random();
    a = Math.round(a * 10) / 10;
  } while (a === 0 || a === 1);
  return a;
};

var uniqArr = [];

var getUniqDecimalRandom = function () {
  if (uniqArr.length >= 9) {
    return getDecimalRandom();
  }
  var unique;
  var a;
  do {
    unique = true;
    a = getDecimalRandom();
    for (var i = 0; i < uniqArr.length; i++) {
      if (a === uniqArr[i]) {
        unique = false;
        break;
      }
    }
  } while (!unique);
  uniqArr[uniqArr.length] = a;
  return a;
};

window.renderStatistics = function (ctx, players, times) {
  uniqArr = [];
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var maxTime = getMaxElement(times);

  var message = 'Ура вы победили!\nСписок результатов:';
  printMessage(message, ctx, CLOUD_X + BAR_GAP, CLOUD_Y + GAP + FONT_GAP);

  for (var i = 0; i < players.length; i++) {
    var playerGistX = CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i;
    var playerGistY = CLOUD_Y + CLOUD_HEIGHT - GAP * 2;
    // print player name
    printMessage(players[i], ctx, playerGistX, playerGistY);

    var playerColumnColor;
    if (players[i] !== 'Вы') {
      var playerColumnSaturation = getUniqDecimalRandom();
      playerColumnColor = 'rgba(0, 0, 255, ' + playerColumnSaturation + ')';
    } else {
      playerColumnColor = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillStyle = playerColumnColor;
    var barHeight = Math.round((GIST_HEIGHT - GAP * 2 - FONT_GAP * 2) * times[i] / maxTime);
    var barY = playerGistY - barHeight - FONT_GAP - GAP;
    ctx.fillRect(playerGistX, barY, BAR_WIDTH, barHeight); // fill player bar
    // print player time
    printMessage(Math.round(times[i]).toString(10), ctx, playerGistX, barY - GAP);
  }
};
