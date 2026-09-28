RadioGroup = function(radioGroupData, context){
  if(radioGroupData == undefined)
    return;
  
  this.textList = [];
  this.context = context;
  this.group = [];
  for(var i = 0; i < radioGroupData.RadioElements.length; i++)
    this.group.push(new RadioElement(radioGroupData.RadioElements[i], context,i));
  
  this.checkBox = radioGroupData.isCheckBox;
  this.correct = radioGroupData.correct;
//  console.log('RadioGroup.correct: ' + this.correct);
  this.valid = false;
  this.delegate = null;
  //Initialize the group
  this.init(context);
};

RadioGroup.prototype = {
  /**
  * Inititalize drag
  */
  init : function(context){
    for(var i=0; i< this.group.length; i++){
      this.group[i].sprite.inputEnabled = true;
      this.group[i].sprite.events.onInputDown.add(
        function(){
          this.context.ToggleElement(this.index);
        },
        {index : i, context : this},1);
    }
  },
  /**
  * Toggle Method
  */
  ToggleElement : function(index){
    var i;
    if(!this.checkBox){
      for(i=0; i< this.group.length; i++){
        this.group[i].ToggleTo(false);
      }
      this.group[index].ToggleTo(true);
      this.valid = index === this.correct;
      if (this.delegate === null) {
        return;
      }
      this.delegate(index === this.correct);
      if (this.textList.length != this.group.length) {
        return;
      }
      for (i = 0; i < this.textList.length; i += 1) {
        this.textList[i].fill = 'black';
      }
      if (index === this.correct) {
        this.textList[index].fill = 'green';
      } else {
        this.textList[index].fill = 'red';
      }
    }else{
      this.group[index].Toggle();
    }
  },
  /**
  * Gets all the active elements
  */
  getActives : function(){
    actives = []
    for(var i=0; i< this.group.length; i++){
      if(this.group[i].active){
        actives.push(i);
      }
    }
    return actives;
  },
  isRadioValid: function() {
    
    if (this.checkBox === true) {
      return false;
    }
    var index = -1;
    for(var i=0; i< this.group.length; i++){
      if(this.group[i].active === true){
        index = i;
        break;
      }
    }
    return index === this.correct;
  }
};