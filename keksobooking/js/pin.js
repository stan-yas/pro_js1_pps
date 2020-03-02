'use strict';
/* global template, offers, card, pin, form, map */

(function () {
  var mouse = {
    x: undefined,
    y: undefined
  };
  var draggedPin;

  window.pin = {};
  pin.container = document.querySelector('.map__pins');
  pin.main = pin.container.querySelector('.map__pin--main');
  pin.create = function (offer) {
    var SHIFT_X = -33 + 260;
    var SHIFT_Y = -55 + 160;
    var p = template.pin.cloneNode(true);
    p.setAttribute('offer_id', offer.id);
    var location = offer.offer.address.split(',');
    p.style.left = (parseInt(location[0], 10) + SHIFT_X).toString() + 'px';
    p.style.top = (parseInt(location[1], 10) + SHIFT_Y).toString() + 'px';
    var img = p.querySelector('img');
    img.src = offer.author.avatar;
    img.alt = offer.offer.title;
    return p;
  };
  pin.renderAll = function () {
    // creating map__pins
    var mapPinsFragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      mapPinsFragment.appendChild(pin.create(offers[i]));
    }
    // render map__pins
    var mapPinsBlock = document.querySelector('.map__pins');
    mapPinsBlock.appendChild(mapPinsFragment);
  };
  pin.dragHandler = function (evt) {
    if (!draggedPin) {
      draggedPin = evt.currentTarget;
      mouse.x = evt.clientX; mouse.y = evt.clientY;
      draggedPin.parentNode.addEventListener('mousemove', pin.moveHandler, true);
      draggedPin.parentNode.addEventListener('mouseup', pin.dropHandler, true);
    }
    evt.stopPropagation();
  };
  pin.moveHandler = function (evt) {
    if (draggedPin) {
      draggedPin.style.left = draggedPin.offsetLeft + (evt.clientX - mouse.x) + 'px';
      draggedPin.style.top = draggedPin.offsetTop + (evt.clientY - mouse.y) + 'px';
      mouse.x = evt.clientX;
      mouse.y = evt.clientY;
    }
  };
  pin.dropHandler = function () {
    if (draggedPin) {
      draggedPin.parentNode.removeEventListener('mousemove', pin.moveHandler, true);
      draggedPin.parentNode.removeEventListener('mouseup', pin.dropHandler, true);
      draggedPin = undefined;
      form.setAddress(pin.main.offsetLeft, pin.main.offsetTop);
      map.activatePage();
    }
  };
  pin.clickHandler = function (evt) {
    if (evt.target.parentElement.className === 'map__pin') {
      card.show(evt.target.parentElement.getAttribute('offer_id'));
    }
  };

  pin.main.addEventListener('mousedown', pin.dragHandler);
  pin.container.addEventListener('mousedown', pin.clickHandler);
})();
