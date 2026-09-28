//JS linter lines
/*jslint node: true */
'use strict';
/*global Phaser, game, Utils, Globals, SpotObject, MessageHandler*/

/**
 * Main state class
 */
var StateBTMLoad = function (game) {};

StateBTMLoad.prototype = {
  preload: function () {
    this.game.stage.backgroundColor = '#ffffff';
    var progBarBkg = this.add.sprite(0, 0, 'ui_button_wrong');
    progBarBkg.x = this.world.centerX - progBarBkg.width / 2;  
    progBarBkg.y = this.world.centerY;
    
    var progBarFrg = this.add.sprite(0, 0, 'ui_button_right');
    progBarFrg.x = progBarBkg.x;
    progBarFrg.y = progBarBkg.y;
    
    this.load.setPreloadSprite(progBarFrg);
    
    // Voice over
    this.load.audio('vo_excellent', ['snd/vos/btm_excellent.mp3','snd/vos/btm_excellent.ogg']);
    this.load.audio('vo_final', ['snd/vos/btm_final.mp3','snd/vos/btm_final.ogg']);
    this.load.audio('vo_excellent_businessman', ['snd/vos/btm_good_businessman.mp3','snd/vos/btm_good_businessman.ogg']);
    this.load.audio('vo_excellent_designer', ['snd/vos/btm_good_designer.mp3','snd/vos/btm_good_designer.ogg']);
    this.load.audio('vo_excellent_gamer', ['snd/vos/btm_good_gamer.mp3','snd/vos/btm_good_gamer.ogg']);
    this.load.audio('vo_excellent_student', ['snd/vos/btm_good_student.mp3','snd/vos/btm_good_student.ogg']);
    this.load.audio('vo_excellent_teacher', ['snd/vos/btm_good_teacher.mp3','snd/vos/btm_good_teacher.ogg']);
    this.load.audio('vo_wrong', ['snd/vos/btm_wrong.mp3','snd/vos/btm_wrong.ogg']);
    
    this.load.audio('vo_1', ['snd/vos/1.mp3', 'snd/vos/1.ogg']);
    this.load.audio('vo_2', ['snd/vos/2.mp3', 'snd/vos/2.ogg']);
    this.load.audio('vo_3', ['snd/vos/3.mp3', 'snd/vos/3.ogg']);
    this.load.audio('vo_4_1', ['snd/vos/4_1.mp3', 'snd/vos/4_1.ogg']);
    this.load.audio('vo_4_2', ['snd/vos/4_2.mp3', 'snd/vos/4_2.ogg']);
    this.load.audio('vo_5_1', ['snd/vos/5_1.mp3', 'snd/vos/5_1.ogg']);
    this.load.audio('vo_5_2', ['snd/vos/5_2.mp3', 'snd/vos/5_2.ogg']);
    this.load.audio('vo_6', ['snd/vos/6.mp3', 'snd/vos/6.ogg']);
    this.load.audio('vo_8_1', ['snd/vos/8_1.mp3', 'snd/vos/8_1.ogg']);
    this.load.audio('vo_8_2', ['snd/vos/8_2.mp3', 'snd/vos/8_2.ogg']);
    this.load.audio('vo_15', ['snd/vos/15.mp3', 'snd/vos/15.ogg']);
    
    // Assets for All scenes
    this.load.audio('sfx_bad', ['snd/bad.mp3','snd/bad.ogg']);
    this.load.audio('sfx_drop', ['snd/drop.mp3','snd/drop.ogg']);
    this.load.audio('sfx_good', ['snd/good.mp3','snd/good.ogg']);
    this.load.audio('sfx_pick', ['snd/pick.mp3','snd/pick.ogg']);
    this.load.audio('sfx_win', ['snd/win.mp3','snd/win.ogg']);
    this.load.audio('sfx_timer', ['snd/timerLoop.mp3','snd/timerLoop.ogg']);
    
    this.load.atlasJSONHash('goodAnimation',
      'img/gen_effects_st01.png',
      'img/gen_effects_st01.json');
    this.load.atlasJSONHash('UI',
      'img/sena_ui_st01.png',
      'img/sena_ui_st01.json');
    
    this.load.image('nameBox', 'img/tooltip.png');
    this.load.image('nameBoxLarge', 'img/tooltip2.png');
    
    // Assets for Scene 1
    this.load.image('bkg_btm1', 'img/bkg_btm.png');
    this.load.atlasJSONHash('btm1', 'img/btm_sc01_st01.png', 'img/btm_sc01_st01.json');
  },
  create: function () {
    this.state.start('StateBTM1');
  }
};