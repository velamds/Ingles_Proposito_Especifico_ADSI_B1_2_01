/**GameObject that can be dragged
* @param dragableObjectData - contains the data array for this dragable object
* @context - the current context of the game, it is used for the creation of the sprite
*/
DragableObject = function(dragableObjectData, context){
  if(dragableObjectData.x == -1)
    dragableObjectData.x = context.world.width;
  if(dragableObjectData.y == -1)
    dragableObjectData.y = context.world.height;
  
  //Reference to the sprite on the scene
  if(dragableObjectData.atlas == "")
    this.sprite = context.add.sprite(dragableObjectData.x,dragableObjectData.y,dragableObjectData.spriteName);
  else
    this.sprite = context.add.sprite(dragableObjectData.x,dragableObjectData.y,dragableObjectData.atlas,dragableObjectData.spriteName);
  
  //Reference to the textboxsprite
  this.nameBox = context.add.sprite(dragableObjectData.x,dragableObjectData.y, dragableObjectData.name.length > 8 ? this.tooltip.textBoxSpriteLarge : this.tooltip.textBoxSprite);
  this.nameBox.x = this.nameBox.x - this.nameBox.width / 2;
  this.nameBox.y = this.nameBox.y - this.nameBox.height;
  var fontSize = dragableObjectData.name.length > 16 ? 30 * 16 / dragableObjectData.name.length : 30;
  var style = { font: fontSize+"px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: this.nameBox.width, align: "center", boundsAlignH: "center", boundsAlignV: 'middle'};
  this.nameText = context.add.text(0, 0, dragableObjectData.name, style);
  
  this.nameText.setTextBounds(
    this.nameBox.x,
    this.nameBox.y,
    this.nameBox.width,
    this.nameBox.height*0.6);
  
  this.nameBox.alpha = 0;
  this.nameText.alpha = 0;
  
  this.sprite.anchor.setTo(0.5);
  
  // enable physics for collisions
  context.physics.arcade.enable(this.sprite);
  this.sprite.body.enable = true;
  this.sprite.immovable = true;

  //Reference to the data
  this.data = dragableObjectData;

  //The previous position of the draggable object
  this.oldPosition = new Phaser.Point(this.sprite.x,this.sprite.y);

  //Boolean for checking if the 
  this.isOnSpot= false;

  //Array with all the spots objects
  this.spots = [];//[new expectedPos(new Phaser.Point(50,50),true),new expectedPos(new Phaser.Point(150,50),false)];
  

  //Array with all the on spot functions
  this.onSpotEvents = [];

  //Array with all the not on spot functions
  this.onNotSpotEvents = [];

  //Initialize the dragable object input
  this.initDrag(context);
};

DragableObject.prototype = {
  /**
  * Inititalize drag
  */
  initDrag : function(context){
    this.sprite.inputEnabled = true;
    this.sprite.input.draggable = true;
    this.sprite.events.onInputUp.add(function(){
      this.checkPosition(context);
      if(this.data.name != '') this.toggleName(this.tooltip.alphaValue);
    },this);
    this.sprite.events.onInputDown.add(function(){
      //The previous position of the draggable object
      this.oldPosition = new Phaser.Point(this.sprite.x,this.sprite.y);
      if(this.data.name != '') this.toggleName(0);
      this.sprite.bringToTop ();
      if (this.pickAudio != null) this.pickAudio.play ();
    },
    this);
    this.sprite.events.onInputOver.add(function(){if(this.data.name != '') this.toggleName(this.tooltip.alphaValue);},this);
    this.sprite.events.onInputOut.add(function(){if(this.data.name != '') this.toggleName(0);},this);
  },
  /**
  * Checks when drag ends if the position is a spot and calls the onSpotEvent
  * If not onSpot calls the onNotSpotEvent
  */
  checkPosition: function(context){
    this.isOnSpot = false;
    for(var i = this.spots.length - 1; i >= 0 && !this.isOnSpot; i--)
      this.checkSpot(this.spots[i],context);
    if(!this.isOnSpot){
      this.callOnNotSpotEvents(context);
    }
  },
  /**
  * Checks if the dragable object is in the spot and calls the onSpotEvent
  */
  checkSpot: function(spot,context){
//    console.log(spot);
    if(this.isOnSpot)
      return;

    var isCollision = context.physics.arcade.overlap(this.sprite, spot.sprite);
    if (isCollision == true) {
      this.callOnSpotEvents(spot, context);
      this.isOnSpot = true;
    }
  },
  /**
  * Adds a new function to the onSpotEvent
  */
  addOnSpotEvent: function(newEvent){
    this.onSpotEvents.push(newEvent);
  },
  /**
  * Adds a new function to the notOnSpotEvent
  */
  addOnNotSpotEvent: function(newEvent){
    this.onNotSpotEvents.push(newEvent);
  },
  /**
  * Calls all the functions in onSpotEvent
  */
  callOnSpotEvents: function(spot,context){
    for(var i=0; i<this.onSpotEvents.length; i++){
      this.onSpotEvents[i](this,spot,context);
    }
  },
  /**
  * Calls all the functions in notOnSpotEvent
  */
  callOnNotSpotEvents: function(context){
    for(var i=0; i<this.onSpotEvents.length; i++){
      this.onNotSpotEvents[i](this,context);
    }
  },
  /**
  * Adds a new spot
  */
  addSpot: function(newSpot,isValid){
    var tempSpot = new SpotObject();
    tempSpot.sprite = newSpot.sprite;
    tempSpot.data = {
      x : newSpot.data.x,
      y : newSpot.data.y,
      atlas : newSpot.atlas,
      spriteName : newSpot.data.spriteName
    };
    tempSpot.data.valid = isValid;
    this.spots.push(tempSpot);
  },
  changeToWrong : function(){
    this.sprite.frameName = this.data.wrongSpriteName;
  },
  changeToCorrect : function(){
    this.sprite.frameName = this.data.spriteName;
  },
  changeSpotValid : function(spot, valid){
    for(var j= 0; j < this.spots.length; j++){
      if(this.spots[j].data.x === spot.data.x && this.spots[j].data.y === spot.data.y){
        this.spots[j].valid = valid;
      }
    }
  },
  toggleName : function(value){
    this.nameBox.alpha = value;
    this.nameText.alpha = value;
    this.nameBox.bringToTop ();
    this.nameText.bringToTop ();
  },
  tooltip : {
    textBoxSprite : 'nameBox',
    textBoxSpriteLarge : 'nameBoxLarge',
    alphaValue : 0.8
  }
};