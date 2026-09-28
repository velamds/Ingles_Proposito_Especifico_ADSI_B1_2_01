//JS linter lines
/*jslint node: true */
'use strict';
/*global Phaser, game, Utils, Globals, SpotObject, DataActivity14, MessageHandler*/

/**
 * Main state class
 */
var StateBoot = function (game) {};

StateBoot.prototype = {
  init: function () {
    this.scale.pageAlignHorizontally = true;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  },
  preload: function () {
    this.load.image('ui_button_wrong', 'img/ui_button_wrong.png');
    this.load.image('ui_button_right', 'img/ui_button_right.png');
  },
  create: function () {
    this.state.start('StateLoad');
  }
};