RadioElement = function(radioObjectData, context, i){
  this.index = i;
  
  if(radioObjectData == undefined)
    return;
  
  if(radioObjectData.x == -1)
    radioObjectData.x = context.world.width;
  if(radioObjectData.y == -1)
    radioObjectData.y = context.world.height;
  
  //Reference to the sprite on the scene
  if(radioObjectData.atlas == "")
    this.sprite = context.add.sprite(radioObjectData.x,radioObjectData.y,radioObjectData.onSpriteName);
  else
    this.sprite = context.add.sprite(radioObjectData.x,radioObjectData.y,radioObjectData.atlas,radioObjectData.onSpriteName);
  this.sprite.anchor.setTo(0.5);
  this.data = radioObjectData;
  
  // enable physics for collisions
  context.physics.arcade.enable(this.sprite);
  this.sprite.body.enable = true;
  this.sprite.immovable = true;
  
  this.active = radioObjectData.active;
  this.sprite.frameName = this.active ? this.data.onSpriteName : this.data.offSpriteName;
};

RadioElement.prototype = {
  /**
  * Inititalize drag
  */
  initDrag : function(context){
    this.sprite.inputEnabled = true;
  },
  /**
  * Toggle Method
  */
  Toggle : function(){
    this.active = !this.active;
    this.sprite.frameName = this.active ? this.data.onSpriteName : this.data.offSpriteName;
  },
  /**
  * Toggle Method
  */
  ToggleTo : function(value){
    this.active = value;
    this.sprite.frameName = this.active ? this.data.onSpriteName : this.data.offSpriteName;
  }
};