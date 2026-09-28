TimerHandler = function (timerHandlerData, context, timerSound = null) {
  this.timerSound = timerSound;
  this.data = timerHandlerData;
  
  //Reference to the guide sprite on the scene
  if (timerHandlerData.timerAtlas == "")
    this.timerHolderSprite = context.add.sprite(timerHandlerData.timerX,timerHandlerData.timerY,timerHandlerData.timerHolderSpriteName);
  else
    this.timerHolderSprite = context.add.sprite(timerHandlerData.timerX, timerHandlerData.timerY, timerHandlerData.timerAtlas, timerHandlerData.timerHolderSpriteName);
  
  //Reference to the guide sprite on the scene
  if (timerHandlerData.timerAtlas == "")
    this.timerSprite = context.add.sprite(0,0,timerHandlerData.timerSpriteName);
  else
    this.timerSprite = context.add.sprite(0,0, timerHandlerData.timerAtlas, timerHandlerData.timerSpriteName);
  
  //Animations
  var frames = Phaser.Animation.generateFrameNames('buildTheMachine_timer_', 1, 20, '.png', 4);
  this.counter = this.timerSprite.animations.add('countDown', frames, 1, false, false);
  
  var style = { font: "36px Arial", fill: "#ffffff", align: "center", fontWeight : "bold"};
  this.timerText = context.add.text(185, 80, "", style);
  
  this.timerHolderSprite.addChild(this.timerSprite);
  this.timerHolderSprite.addChild(this.timerText);
};

TimerHandler.prototype= {
  start : function (initialTime, context) {
    this.timerText.setText(initialTime);
    this.timerSprite.play('countDown');
    this.loop = context.time.events.loop(1000, function(){
      if(this.timerSound != null)
        this.timerSound.play();
      initialTime--;
      if(initialTime < 0) initialTime = 0;
      this.timerText.setText(initialTime);
    }, this);
  }
};