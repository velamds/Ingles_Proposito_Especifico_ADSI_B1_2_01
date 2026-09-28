//JS linter lines
/*jslint node: true */
'use strict';
/*global Phaser, game, Utils, Globals, SpotObject, DataBTMGeneral, DataBTM, DataBTMGeneral, MessageHandler*/

/**
 * Main state class
 */
var StateBTM3 = function (game) {};

StateBTM3.prototype = {
  create : function () {
    
    // Audio
    this.sfxWin = this.add.audio('sfx_win');
    this.sfxGood = this.add.audio('sfx_good');
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.background = game.add.sprite(0, 0, 'bkg_btm1');
    this.background.alpha = 0.6;
    
    this.voIntro = [
      this.add.audio('vo_4_1'),
      this.add.audio('vo_4_2')
    ];

    this.voFinal = [
      this.add.audio('final'),
      this.add.audio('vo_15')
    ];
    
    this.voExcellent = [];
    this.voExcellent[0] = this.add.audio('vo_excellent_gamer');
    this.voExcellent[1] = this.add.audio('vo_excellent_designer');
    this.voExcellent[2] = this.add.audio('vo_excellent_businessman');
    this.voExcellent[3] = this.add.audio('vo_excellent_teacher');
    this.voExcellent[4] = this.add.audio('vo_excellent_student');
    var i;
    for (i = 0; i < this.voExcellent.length; i++) {
      this.voExcellent[i].onStop.add(this.finalCheck, this);
    }
    
    this.voWrong = this.add.audio('vo_wrong');

    this.charList = DataBTMGeneral.characters;
    
    var i;
    
    var style = { font: "30px Arial", fill: "#ffffff", align: "center"};
    for (i = 0; i < this.charList.length; i++) {
      var charData = this.charList[i];
      var badge = this.add.sprite(charData.x, charData.y, 'btm1', 'buildTheMachine_charSmall_badge.png');
      badge.anchor.set(0.5);
      var character = this.add.sprite(charData.x, charData.y, 'btm1', charData.charSpriteSmall);
      character.anchor.set(0.5);
      var label = this.add.sprite(charData.x, charData.y, 'btm1', charData.charNameTagSmall);
      label.anchor.set(0.5);
      label.y += character.height * 0.55;
      var text = this.add.text(label.x, label.y, charData.charName, style);
      text.anchor.set(0.5);
      label.inputEnabled = true;
      label.events.onInputDown.add(function(index) {
        this.goToBuild(index);
      }.bind(this, i), this);
      if (charData.progress == false) {
        continue;
      }
      label.inputEnabled = false;
      var checkmark = this.add.sprite(character.x, character.y, 'btm1', 'buildTheMachine_itemLarge_right.png');
      checkmark.anchor.set(0.5);
    }
    this.vfxGood = this.add.sprite(0, 0, 'goodAnimation', 'selection_good0001.png');
    this.vfxGood.anchor.set(0.5);
    this.vfxGood.x = this.world.centerX;
    this.vfxGood.y = this.world.centerY;
    var vfxGoodFrames = Phaser.Animation.generateFrameNames('selection_good', 1, 7, '.png', 4);
    this.vfxGood.animations.add('good', vfxGoodFrames, 9, false, false);
    this.vfxGood.kill();
    
    this.messageHandler = new MessageHandler (DataBTM.messageData, this);
    this.progressHandler = new ProgressHandler(DataBTM.progressData, this);
    var progress = this.getProgress();
//    console.log('progress: ' + progress);
    this.progressHandler.setStep(2 + progress);
   
    this.time.events.add(2000, this.playIntro, this);
    this.disableInput();
  },
  getProgress: function() {
    var i;
    var progress = 0;
    for (i = 0; i < this.charList.length; i +=1 ) {
      if (this.charList[i].progress == true) {
        progress += 1;
      }
    }
    return progress;
  },
  goToBuild: function(index) {
    DataBTMGeneral.index = index;
    this.disableInput();
    this.sfxGood.play();
    this.vfxGood.revive();
    this.vfxGood.x = this.charList[index].x;
    this.vfxGood.y = this.charList[index].y;
    this.vfxGood.animations.play('good');
    this.time.events.add(2000, this.goToNextScene, this);
  },
  playIntro: function () {
    this.enableInput();
    if (DataBTMGeneral.index == -1) {
      this.disableInput();
      var messages = [DataBTM3.firstMessage, DataBTM3.instruction];
      this.messageHandler.showMultipleMessagesWithAudio(messages, this.voIntro, 0, this.enableInput, this);
      return;
    }    
    var index = DataBTMGeneral.index;
    var message = "";
    if (this.charList[index].progress == true) {
      message = DataBTMGeneral.successMessage + this.charList[index].charNameSuccess;
      this.messageHandler.showMessage(message, 1);
      this.voExcellent[index].play();
    } else {
      message = DataBTMGeneral.failureMessage;
      this.messageHandler.showMessage(message, 2);
      this.voWrong.play();
    }    
  },
  finalCheck: function() {
    if (this.isAllDone()) {
      this.endLevel();
    }
  },
  isAllDone: function() {
    var i;
    for (i = 0; i < this.charList.length; i++) {
      if (this.charList[i].progress === false)
        return false;
    }
    return true;
  },
  endLevel : function(){
    this.disableInput();
    this.messageHandler.showMessage(DataBTMGeneral.doneMessage, 1);
    var messages = [DataBTM3.finalMessage1, DataBTM3.finalMessage2];
    this.messageHandler.showMultipleMessagesWithAudio(messages, this.voFinal, 0, this.goToEnd, this);
  },
  enableInput: function(){
    game.input.enabled = true;
  },
  disableInput: function(){
    game.input.enabled = false;
  },
  goToEnd: function() {
    this.state.start('StateOver');
  },
  goToNextScene: function () {
    this.state.start('StateBTM4');
  }
};