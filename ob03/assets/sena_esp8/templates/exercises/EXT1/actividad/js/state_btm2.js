//JS linter lines
/*jslint node: true */
'use strict';
/*global Phaser, game, Utils, Globals, SpotObject, DataBTMGeneral, DataBtm, MessageHandler*/

/**
 * Main state class
 */
var StateBTM2 = function (game) {};

StateBTM2.prototype = {
  create : function () {
    
    game.input.enabled = false;
    // Audio
    this.sfxWin = this.add.audio('sfx_win');
    this.sfxPick = this.add.audio('sfx_pick');
    this.voIntro = [
      this.add.audio('vo_2'),
      this.add.audio('vo_3')
    ];
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.background = game.add.sprite(0, 0, 'bkg_btm1');
    
    

    this.itemBadge = this.add.sprite(0, 0, 'btm1', 'buildTheMachine_itemLarge_badge.png');
    this.itemBadge.anchor.set(0.5);
    this.itemBadge.x = 300;
    this.itemBadge.y = this.world.centerY - 20;
    
    this.itemIcon = this.add.sprite(0, 0, 'btm1', 'buildTheMachine_itemLarge_barcodeReader.png')
    this.itemIcon.anchor.set(0.5);
    this.itemIcon.x = this.itemBadge.x;
    this.itemIcon.y = this.itemBadge.y;
    
    this.itemName = this.add.sprite(0, 0, 'btm1', 'buildTheMachine_nameLarge_single.png');
    this.itemName.anchor.x = 0.5;
    this.itemName.x = this.itemBadge.x;
    this.itemName.y = this.itemBadge.y + 80;
    
    var style = { font: "34px Arial", fill: "#ffffff", align: "center"};
    this.itemNameText = this.add.text(0, 0, 'Item name', style);
    this.itemNameText.anchor.set(0.5, 0);
    this.itemNameText.position = this.itemName.position.clone();
    this.itemNameText.y += 10;
    
    this.cloudStart = this.add.sprite(430, 220, 'btm1', 'buildTheMachine_ui_cloudLargeStart_B.png');
    this.cloudEnd = this.add.sprite(this.world.width - 200, 220, 'btm1', 'buildTheMachine_ui_cloudLargeEnd_B.png');
    this.cloudEnd.anchor.x = 1;
    var middleLeft = this.cloudStart.x + this.cloudStart.width - 20;
    var middleRight = this.cloudEnd.x - this.cloudEnd.width + 20;
    var tileWidth = middleRight - middleLeft;
    var tileHeight = this.cloudEnd.height;
    this.cloudMiddle = this.add.tileSprite(middleLeft, 220, tileWidth, tileHeight, 'btm1', 'buildTheMachine_ui_cloudLargeMid_B.png');
    
    
    style = { font: "52px Arial", fill: "#ffffff", align: "left"};
    var testText = "It is an external device used to control media on a computer; this is widely used for different types of presentations.";
    this.cloudText = this.add.text(0, 0, testText, style);
    this.cloudText.x = this.cloudStart.x + this.cloudStart.width * 0.5;
    this.cloudText.y = this.cloudStart.y + this.cloudStart.height * 0.05;
    this.cloudText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 2);
    this.cloudText.wordWrap = true;
    this.cloudText.wordWrapWidth = 1200;
    
    
    this.itemCounter = this.add.sprite(0, 0, 'btm1', 'buildTheMachine_ui_itemCounter.png');
    this.itemCounter.anchor.set(0.5);
    this.itemCounter.x = this.cloudEnd.x - this.cloudEnd.width * 0.7;
    this.itemCounter.y = this.cloudEnd.y + this.cloudEnd.height * 1.1;
    
    this.itemsCurrent = 0;
    this.items = DataBTM2.items;
    style = {font: "60px Arial", fill: "#ffffff", align: "center"};
    this.itemCounterText = this.add.text(0, 0, '00/00', style);
    this.itemCounterText.anchor.set(0.5);
    this.itemCounterText.position = this.itemCounter.position;
    
    
    var border = 20;
    this.btnBack = this.add.sprite(0, 0, 'btm1', 'buildTheMachine_ui_button.png');
    this.btnBack.anchor.set(0.5);
    this.btnBack.x = this.world.centerX - this.btnBack.width / 2 - border;
    this.btnBack.y = this.world.height - this.btnBack.height / 2 - border;
    this.btnBack.inputEnabled = true;
    this.btnBack.events.onInputDown.add(this.prevItem, this);
    style = {font: "40px Arial", fill: "#ffffff", align: "center"};
    this.btnBackText = this.add.text(this.btnBack.x, this.btnBack.y, 'Back', style);
    this.btnBackText.anchor.set(0.5);
    
    this.btnNext = this.add.sprite(0, 0, 'btm1', 'buildTheMachine_ui_button.png');
    this.btnNext.anchor.set(0.5);
    this.btnNext.x = this.world.centerX + this.btnNext.width / 2 + border;
    this.btnNext.y = this.btnBack.y;
    this.btnNext.inputEnabled = true;
    this.btnNext.events.onInputDown.add(this.nextItem, this);
    this.btnNextText = this.add.text(this.btnNext.x, this.btnNext.y, 'Next', style);
    this.btnNextText.anchor.set(0.5);
    
    this.loadItem(this.itemsCurrent);
    
    
    this.messageHandler = new MessageHandler (DataBTM.messageData, this);
    this.progressHandler = new ProgressHandler(DataBTM.progressData, this);
    this.progressHandler.setStep(1);
   
    this.time.events.add(2000, this.playIntro, this);
  },
  nextItem: function() {
    this.itemsCurrent++;
    if (this.itemsCurrent === this.items.length) {
      this.btnBack.inputEnabled = false;
      this.btnNext.inputEnabled = false;
      this.endLevel();
      return;
    }
    if (this.itemsCurrent >= this.items.length) {
      this.itemsCurrent = 0;
    }
    
    this.sfxPick.play();
    this.loadItem(this.itemsCurrent);
  },
  prevItem: function() {
    this.itemsCurrent--;
    if (this.itemsCurrent < 0) {
      this.itemsCurrent = this.items.length - 1;
    }
    this.sfxPick.play();
    this.loadItem(this.itemsCurrent);
  },
  loadItem: function(index) {
    this.btnBack.kill();
    this.btnBackText.kill();
    if (index != 0) {
      this.btnBack.revive();
      this.btnBackText.revive();
    }
    var item = this.items[index];
    this.cloudText.text = item.description;
    this.itemIcon.frameName = item.sprite;
    this.itemName.frameName = item.spriteName;
    this.itemNameText.text = item.name;
    this.itemCounterText.text = Utils.zeroPad(index + 1, 2) + '/' + this.items.length;
    
    var temp = Math.floor(1 + this.cloudText.text.length/51) * 51;
    
    
    this.cloudStart.scale.setTo(1,temp/(51*3.5));
    this.cloudMiddle.scale.setTo(1,temp/(51*3.5));
    this.cloudEnd.scale.setTo(1,temp/(51*3.5));
  },
  playIntro: function () {
    this.disableInput();
    var messages = [DataBTM2.firstMessage, DataBTM2.instruction];
    this.messageHandler.showMultipleMessagesWithAudio(messages, this.voIntro, 0, this.enableInput, this);
  },
  endLevel : function(){
    this.sfxWin.play();
    this.time.events.add(2000, this.goToNextScene, this);
  },
  enableInput: function(){
    game.input.enabled = true;
  },
  disableInput: function(){
    game.input.enabled = false;
  },
  goToNextScene: function () {
    this.state.start('StateBTM3');
  }
};