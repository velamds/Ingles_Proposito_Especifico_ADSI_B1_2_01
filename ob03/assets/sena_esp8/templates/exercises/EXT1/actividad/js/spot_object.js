SpotObject = function(spotableObjectData, context){
  if(spotableObjectData == undefined)
    return;
  
  if(spotableObjectData.x == -1)
    spotableObjectData.x = context.world.width;
  if(spotableObjectData.y == -1)
    spotableObjectData.y = context.world.height;
  
  //Reference to the sprite on the scene
  if(spotableObjectData.atlas == "")
    this.sprite = context.add.sprite(spotableObjectData.x,spotableObjectData.y,spotableObjectData.spriteName);
  else
    this.sprite = context.add.sprite(spotableObjectData.x,spotableObjectData.y,spotableObjectData.atlas,spotableObjectData.spriteName);
  this.sprite.anchor.setTo(0.5);
  this.data = spotableObjectData;
  
  // enable physics for collisions
  context.physics.arcade.enable(this.sprite);
  this.sprite.body.enable = true;
  this.sprite.immovable = true;
}