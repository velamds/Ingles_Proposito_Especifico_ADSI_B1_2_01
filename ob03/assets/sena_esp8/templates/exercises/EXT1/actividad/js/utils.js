/*jslint node: true */
'use strict';

var Utils = {};

/**
 *
 */
Utils.randomRange = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Pad zeroes to the left
 *
 * Solution found on: http://stackoverflow.com/a/1267392/99862
 */
Utils.zeroPad = function (number, length) {
   // Setup
  var result, pad;
  result = number.toString();
  pad = length - result.length;
  while (pad > 0) {
    result = '0' + result;
    pad -= 1;
  }
  return result;
};