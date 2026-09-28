//JS linter lines
/*jslint node: true */
'use strict';
/*global Phaser, game, Utils, Globals, SpotObject, MessageHandler*/

/**
 * Main state class
 */
var StateBTMOver = function (game) {};

StateBTMOver.prototype = {
  create: function () {
    this.game.stage.backgroundColor = '#ffffff';
  }
};