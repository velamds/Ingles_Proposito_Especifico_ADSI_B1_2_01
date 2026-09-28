/**GameObject that can be dragged
* @param clickableObjectData - contains the data array for this clickable object
* @context - the current context of the game, it is used for the creation of the sprite
*/
ClickableObject = function(clickableObjectData, context){
  if(clickableObjectData.x == -1)
    clickableObjectData.x = context.world.width;
  if(clickableObjectData.y == -1)
    clickableObjectData.y = context.world.height;
  //Reference to the sprite on the scene
  if(clickableObjectData.atlas == '')
    this.sprite = context.add.sprite(clickableObjectData.x,clickableObjectData.y,clickableObjectData.spriteName);
  else
    this.sprite = context.add.sprite(clickableObjectData.x,clickableObjectData.y,clickableObjectData.atlas,clickableObjectData.spriteName);  
  
  //this.anchor = this.sprite.anchor;
  this.sprite.anchor.setTo(0.5);
  this.enable();

  //Reference to the data
  this.data = clickableObjectData;
};

ClickableObject.prototype = {
  addOnClickEvent : function(newEvent, gameContext, objReference){
    this.sprite.events.onInputUp.add(function(){newEvent(objReference, gameContext)},this);
  },
  disable: function () {
    this.sprite.inputEnabled = false;
  },
  enable: function () {
    this.sprite.inputEnabled = true;
  }
};