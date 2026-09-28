//JS linter lines
/*jslint node: true */
'use strict';
/*global Phaser, game, Utils, Globals, SpotObject, DataBTMGeneral, DataBtm, MessageHandler*/

/**
 * Main state class
 */
var StateBTM1 = function (game) {};

StateBTM1.prototype = {
  create : function () {
    
    // Audio
    // this.sfxWin = this.add.audio('sfx_win');
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.background = game.add.sprite(0, 0, 'bkg_btm1');
    this.background.alpha = 0.6;

    var style = { font: "52px Arial", fill: "#ffffff", align: "center"};
    this.textWelcome = this.add.text(0, 0, DataBTM1.firstMessage, style);
    this.textWelcome.anchor.set(0.5, 0);
    this.textWelcome.x = this.world.centerX;
    this.textWelcome.y = 150;
    this.textWelcome.wordWrap = true;
    this.textWelcome.wordWrapWidth = this.world.width * 0.8;
    this.textWelcome.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    
     this.voBegin = this.add.audio('vo_1');
     this.voBegin.onStop.add(this.endLevel, this);

//    this.btnNext = this.add.sprite(0, 0, 'UI', 'ui_button_idle.png');
//    this.btnNext.anchor.set(0.5);
//    this.btnNext.x = this.world.width - this.btnNext.width / 2;
//    this.btnNext.y = this.world.height - this.btnNext.height / 2;
//    this.btnNext.inputEnabled = true;
//    this.btnNext.events.onInputDown.add(this.endLevel, this);
//    style = {
//      font: '42px Arial',
//      fill: '#fff',
//      align: 'center'
//    };
//    this.btnNextText = this.add.text(0, 0, 'Start', style);
//    this.btnNextText.anchor.set(0.5);
//    this.btnNextText.setShadow(2, 2, 'rgba(0,0,0,0.8)', 5);
//    this.btnNext.addChild(this.btnNextText);
    
    this.playIntro();
    // this.time.events.add(5000, this.endLevel, this);
  },
  playIntro: function () {
    game.input.enabled = true;
     this.voBegin.play();
  },
  endLevel : function(){
    this.time.events.add(2000, this.goToNextScene, this);
  },
  enableInput: function(){
    game.input.enabled = true;
  },
  disableInput: function(){
    game.input.enabled = false;
  },
  goToNextScene: function () {
    this.state.start('StateBTM2');
  }
};