//JS linter lines
/*jslint node: true */
/*global Phaser, Utils, Globals, Progress*/
ProgressHandler = function (progressHandlerData, context) {
  var i, nextX;
  this.game = game;
  this.data = progressHandlerData;
  this.step = 1;
  this.strMsgBase = 'STEP ';
  this.txtMessage = context.add.text(this.data.textX, this.data.textY, '');
  this.txtMessage.fill = '#1878BD';
  this.line = context.add.sprite(this.data.progressBarX + 6, this.data.progressBarY + 4, this.data.atlas, this.data.spriteLine);
  this.spriteArray = [];
  for (i = 0; i < this.data.totalScenes; i += 1) {
    this.spriteArray[i] = context.add.sprite(0, 0, this.data.atlas, this.data.spriteOff);
    this.spriteArray[i].x = i * this.spriteArray[i].width + this.data.offset * i + this.data.progressBarX;
  }
  var tempDist = (i-1) * this.spriteArray[i-1].width + this.data.offset * (i-1);
  this.line.scale.x = tempDist / this.line.width;//this.data.totalScenes * 2.85;
};

ProgressHandler.prototype = {
  reset: function () {
    this.step = 1;
  },
  stepUp: function () {
    this.setStep(this.step + 1);
  },
  setStep: function (step) {
    var i;
    this.step = step;
    this.step = this.step > this.data.totalScenes ? this.data.totalScenes : this.step;
    this.step = this.step < 1 ? 1 : this.step;
    this.updateText();
    for (i = 0; i < this.data.totalScenes; i += 1) {
      this.spriteArray[i].loadTexture(this.data.atlas, this.data.spriteOff);
    }
    this.spriteArray[this.step - 1].loadTexture(this.data.atlas, this.data.spriteOn);
  },
  updateText : function () {
    this.strMessage = this.strMsgBase + this.step + " / " + this.data.totalScenes;
    this.txtMessage.text = this.strMessage;
  }
};

/**
+totalSteps
+step

-reset()
-stepUp()
-setStep(num)

*/
