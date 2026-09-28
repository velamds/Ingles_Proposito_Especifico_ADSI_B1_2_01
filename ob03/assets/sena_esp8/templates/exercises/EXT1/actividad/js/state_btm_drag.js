//JS linter lines
/*jslint node: true */
'use strict';
/*global Phaser, game, Utils, Globals, SpotObject, DataBTMGeneral, DataBtm, MessageHandler*/

/**
 * Main state class
 */
var StateBTMDrag = function (game) {};

var DataBTMDrag;

StateBTMDrag.prototype = {
  init: function () {
    this.scale.pageAlignHorizontally = true;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  },
  preload : function () {
  },
  create : function () {
    DataBTMDrag = DataBTMGeneral.characters[DataBTMGeneral.index].data;
    
    game.input.enabled = false;
    // Audio
    this.sfxBad = this.add.audio('sfx_bad');
    this.sfxDrop = this.add.audio('sfx_drop');
    this.sfxGood = this.add.audio('sfx_good');
    this.sfxPick = this.add.audio('sfx_pick');
    this.sfxWin = this.add.audio('sfx_win');
    this.sfxTimer = this.add.audio('sfx_timer');
  
    this.voIntro = [
      this.add.audio('vo_8_1'),
      this.add.audio('vo_8_2')
    ];

    this.voExcellent = this.add.audio('vo_excellent');
    this.voWrong = this.add.audio('vo_wrong');
    

    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.background = game.add.sprite(0, 0, 'bkg_btm1');

    var validCounter = 0, i;

    var style = { font: "30px Arial", fill: "#ffffff", align: "center"};
    
    this.spotsObjects = [];
    for (i = 0; i < DataBTMDrag.spotsData.length; i++){
      this.spotsObjects.push(new SpotObject(DataBTMDrag.spotsData[i],this));
      this.spotsObjects[i].active = true;
      
      var temp = this.add.sprite ( 0, 0, DataBTMDrag.spotsData[i].atlas, DataBTMDrag.spotsData[i].itemSpriteName);
      temp.anchor.setTo(0.5);
      this.spotsObjects[i].sprite.addChild(temp);
      
      temp = this.add.sprite ( 0, this.spotsObjects[i].sprite.height * 0.45, DataBTMDrag.spotsData[i].atlas, DataBTMDrag.spotsData[i].textSpriteName);
      temp.anchor.setTo(0.5,0);
      
      var temp2 = this.add.text ( 0, temp.height * 0.5, DataBTMDrag.spotsData[i].text, style);
      temp2.anchor.setTo(0.5);
      temp.addChild(temp2);
      
      this.spotsObjects[i].sprite.addChild(temp);
      
      //Reference to the sprite on the scene
      if(DataBTMDrag.goodAnimation.atlas == "")
        this.spotsObjects[i].good = this.add.sprite ( DataBTMDrag.spotsData[i].x + DataBTMDrag.goodAnimation.x, DataBTMDrag.spotsData[i].y + DataBTMDrag.goodAnimation.y, DataBTMDrag.goodAnimation.spriteName);
      else
        this.spotsObjects[i].good = this.add.sprite ( DataBTMDrag.spotsData[i].x + DataBTMDrag.goodAnimation.x, DataBTMDrag.spotsData[i].y + DataBTMDrag.goodAnimation.y, DataBTMDrag.goodAnimation.atlas, DataBTMDrag.goodAnimation.spriteName);
      
      
      this.spotsObjects[i].good.pivot.set(this.spotsObjects[i].good.width * 0.5, this.spotsObjects[i].good.height * 0.5);
      this.spotsObjects[i].good.alpha = 0;
      this.spotsObjects[i].good.rotation = this.rnd.realInRange(0,2*Math.PI);
      this.spotsObjects[i].good.animations.add('good', [], 12, false, false);
    }
    
    this.dragablesObjects = [];
    for (i = 0; i < DataBTMDrag.dragableData.length; i++) {
      this.dragablesObjects.push(new DragableObject(DataBTMDrag.dragableData[i],this));
      
      var temp = this.add.sprite ( 0, 0, DataBTMDrag.dragableData[i].atlas, DataBTMDrag.dragableData[i].itemSpriteName);
      temp.anchor.setTo(0.5);
      this.dragablesObjects[i].sprite.addChild(temp);
      
      temp = this.add.sprite ( 0, this.dragablesObjects[i].sprite.height * 0.45, DataBTMDrag.dragableData[i].atlas, DataBTMDrag.dragableData[i].textSpriteName);
      temp.anchor.setTo(0.5,0);
      
      var temp2 = this.add.text ( 0, temp.height * 0.5, DataBTMDrag.dragableData[i].text, style);
      temp2.anchor.setTo(0.5);
      temp.addChild(temp2);
      
      this.dragablesObjects[i].sprite.addChild(temp);
      
      this.dragablesObjects[i].check = this.add.sprite ( 0, 0, DataBTMGeneral.check.checkAtlas, DataBTMGeneral.check.checkSprite);
      this.dragablesObjects[i].check.anchor.setTo(0.5);
      this.dragablesObjects[i].check.alpha = 0;
      this.dragablesObjects[i].sprite.addChild(this.dragablesObjects[i].check);
      
      this.dragablesObjects[i].addOnSpotEvent(this.mySpotEvent);
      this.dragablesObjects[i].addOnNotSpotEvent(this.myNotOnSpotEvent);
      for(var j = 0; j < DataBTMDrag.dragableData[i].validSpots.length; j++){
        this.dragablesObjects[i].addSpot (this.spotsObjects[j], DataBTMDrag.dragableData[i].validSpots[j]);
        this.dragablesObjects[i].spots[j].good = this.spotsObjects[j].good;
      }
      this.dragablesObjects[i].pickAudio = this.sfxPick;
      if(DataBTMDrag.dragableData[i].valid)
        validCounter++;
    }

    this.counter = 0;
    this.step = 0;

    //this.messageHandler = this.add.text(10,10,DataBTMDrag.firstMessage);
    this.messageHandler = new MessageHandler (DataBTM.messageData, this);
    
    this.progressHandler = new ProgressHandler(DataBTM.progressData, this);
    this.progressHandler.setStep(2 + this.getProgress());
    this.time.events.add(2000, this.playIntro, this);
    
    this.timerHandler = new TimerHandler(DataBTMGeneral.timer, this, this.sfxTimer);
    this.timerHandler.counter.onComplete.add(this.goToNextScene,this);
  },
  getProgress: function() {
    var i;
    var progress = 0;
    this.charList = DataBTMGeneral.characters;
    for (i = 0; i < this.charList.length; i +=1 ) {
      if (this.charList[i].progress == true) {
        progress += 1;
      }
    }
    return progress;
  },
  playIntro: function () {
    game.input.enabled = true;
    this.disableInput();
    var messages = [DataBTMGeneral.firstMessageDrag, DataBTMGeneral.instructionDrag];
    this.messageHandler.showMultipleMessagesWithAudio(messages, this.voIntro, 0, this.startTimer, this);
  },
  mySpotEvent : function (dragableObj,spotObj,gameContext) {
    if(spotObj.data.valid == 2){
      gameContext.myNotOnSpotEvent(dragableObj,gameContext);
      return;
    }
    //gameContext.stopAllVO(gameContext);
    for(var i = 0; i < gameContext.dragablesObjects.length; i++)
      gameContext.dragablesObjects[i].changeToCorrect();
    if(spotObj.data.valid && dragableObj.data.valid && gameContext.step == dragableObj.data.step){
      //gameContext.voCorrect[gameContext.step].play();
      gameContext.sfxGood.play();
      gameContext.counter++;
      dragableObj.sprite.inputEnabled = false;
      if(dragableObj.data.hideOnEvent){
        dragableObj.sprite.alpha = 0;
      }else{
        dragableObj.sprite.x = dragableObj.oldPosition.x;
        dragableObj.sprite.y = dragableObj.oldPosition.y;
      }
      dragableObj.check.alpha = 1;
      gameContext.voExcellent.play();
      gameContext.messageHandler.showMessage(dragableObj.data.messageOnValidSpot, 1);
      spotObj.good.bringToTop();
      spotObj.good.play('good');
      spotObj.good.alpha = 1;
      if(gameContext.counter == DataBTMDrag.objective[gameContext.step])
      {
        gameContext.step++;
        if(gameContext.step == DataBTMDrag.objective.length){
          gameContext.sfxGood.stop();
          gameContext.sfxWin.play();
          gameContext.timerHandler.timerSound.stop();
          gameContext.timerHandler.timerSound = null;
          gameContext.endLevel(gameContext);
        }else{
          gameContext.counter = 0;
        }
        //game.state.start('StateActivity14');
      }
    }else{
      gameContext.voWrong.play();
      gameContext.sfxBad.play();
      dragableObj.sprite.x = dragableObj.oldPosition.x;
      dragableObj.sprite.y = dragableObj.oldPosition.y;
      dragableObj.sprite.inputEnabled = false;
      dragableObj.sprite.alpha = 0.5;
      gameContext.messageHandler.showMessage(dragableObj.data.messageOnWrongSpot, 2);
    }
  },
  myNotOnSpotEvent : function(dragableObj,gameContext){
    gameContext.sfxDrop.play();
    dragableObj.sprite.x = dragableObj.oldPosition.x;
    dragableObj.sprite.y = dragableObj.oldPosition.y;
  },
  endLevel : function(gameContext){
    //gameContext.stopAllVO(gameContext);
    //this.voEnd.play();
    DataBTMGeneral.characters[DataBTMGeneral.index].progress = true;
    //TEMPORAL
//    DataBTMGeneral.index++;
    gameContext.timerHandler.counter.onComplete.remove(gameContext.goToNextScene,gameContext);
    gameContext.time.events.add(2000, this.goToNextScene, this);
  },
  enableInput: function(){
    game.input.enabled = true;
  },
  startTimer: function() {
    this.enableInput();
    this.timerHandler.start(DataBTMGeneral.timer.initialTimer,this);
  },
  disableInput: function(){
    game.input.enabled = false;
  },
  goToNextScene: function () {
    this.state.start('StateBTM3');
  },
  stopAllVO : function(gameContext){
    gameContext.voBegin.stop();
    gameContext.voCorrect[0].stop();
    gameContext.voCorrect[1].stop();
    gameContext.voCorrect[2].stop();
    gameContext.voWrong.stop();
    gameContext.voEnd.stop();
  }
};