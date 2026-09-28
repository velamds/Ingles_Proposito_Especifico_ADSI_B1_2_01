/**GameObject that can be dragged
* @param dragableObjectData - contains the data array for this dragable object
* @context - the current context of the game, it is used for the creation of the sprite
*/
MessageHandler = function (messageHandlerData, context) {
  this.data = messageHandlerData;
  
  //Reference to the guide sprite on the scene
  if (messageHandlerData.guideAtlas == "")
    this.guideSprite = context.add.sprite(messageHandlerData.guideX,messageHandlerData.guideY,messageHandlerData.guideSpriteName);
  else
    this.guideSprite = context.add.sprite(messageHandlerData.guideX, messageHandlerData.guideY, messageHandlerData.guideAtlas, messageHandlerData.guideSpriteName);
  
  this.textBoxSprite = [];
  
  //Reference to the text box sprite on the scene
  var desp = 0;
  if (messageHandlerData.textBoxAtlas == "")
    for(var i = 0; i < 3; i++){
      desp += i==0 ? 0 : this.textBoxSprite[i-1].width;
      this.textBoxSprite.push( context.add.sprite(messageHandlerData.textBoxX + desp, messageHandlerData.textBoxY, messageHandlerData.textBoxNeutralSprite[i]));
    }
  else
    for(var i = 0; i < 3; i++){
      desp += i==0 ? 0 : this.textBoxSprite[i-1].width;
      this.textBoxSprite.push( context.add.sprite(messageHandlerData.textBoxX + desp, messageHandlerData.textBoxY, messageHandlerData.textBoxAtlas, messageHandlerData.textBoxNeutralSprite[i]));
    }
  
  var style = { font: "24px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: desp + this.textBoxSprite[2].width - messageHandlerData.textOffsetX, align: "left", boundsAlignH: "left", boundsAlignV: 'middle'};
  this.message = context.add.text(
    messageHandlerData.textOffsetX,
    messageHandlerData.textOffsetY,
    '',style);
  
  this.message.setTextBounds(
    messageHandlerData.textBoxX,
    messageHandlerData.textBoxY,
    desp + this.textBoxSprite[2].width,
    this.textBoxSprite[1].height);
  
  for (var i = 0; i < this.textBoxSprite.length; i++) {
    this.textBoxSprite[i].kill();
  }
};

MessageHandler.prototype= {
  showMessage : function (message, type) {
    this.message.setText(message);
    switch(type){
      case 0: //Initial state
        for(var i = 0; i < 3; i++)
          this.textBoxSprite[i].frameName = this.data.textBoxNeutralSprite[i];
        break;
      case 1: //Correct state
        for(var i = 0; i < 3; i++)
          this.textBoxSprite[i].frameName = this.data.textBoxCorrectSprite[i];
        break;
      case 2: //Wrong state
        for(var i = 0; i < 3; i++)
          this.textBoxSprite[i].frameName = this.data.textBoxWrongSprite[i];
        break;
    }
    
    var extraLetters = message.length / 3 - this.data.maxAmountPerLine;
    
    if(extraLetters < 0)
      extraLetters = 0;
    
    this.textBoxSprite[1].scale.set(1 + extraLetters * 0.1,1);
    var desp= this.textBoxSprite[0].width + this.textBoxSprite[1].width;
    this.textBoxSprite[2].x = desp + this.data.textBoxX;
    this.message.wordWrapWidth = desp + this.textBoxSprite[2].width/2;
    
    /*this.message.setTextBounds(
    this.data.textBoxX,
    this.data.textBoxY,
    desp + this.textBoxSprite[2].width,
    this.textBoxSprite[1].height);*/
    this.show();
  },
  showMessageWithAudio : function (message, audio, type){
    this.showMessage(message,type);
    audio.play();
  },
  showMultipleMessagesWithAudio : function (messages, audios, type){
    this.showMultipleMessagesWithAudio(messages, audios, type, null, null);
  },
  showMultipleMessagesWithAudio : function (messages, audios, type, callback, context){
    this.showMessageWithAudio(messages[0],audios[0],type);
    for (var i=0; i< messages.length - 1; i++){ 
      audios[i].onStop.add(function(){ 
        this.messageHandler.showMessageWithAudio(this.nextMessage,this.nextAudio,type);
      }
      ,{nextAudio : audios[i+1], nextMessage : messages[i+1], messageHandler : this});
    }
    if (context == undefined || context == null || callback == undefined || callback == null)
      return;
    audios[audios.length -1].onStop.add(callback, context);
  },
  hide: function() {
    this.message.kill();
    var i;
    for (i = 0; i < this.textBoxSprite.length; i++)
      this.textBoxSprite[i].kill();
  },
  show: function() {
    this.message.revive();
    var i;
    for (i = 0; i < this.textBoxSprite.length; i++)
      this.textBoxSprite[i].revive();
  }
};