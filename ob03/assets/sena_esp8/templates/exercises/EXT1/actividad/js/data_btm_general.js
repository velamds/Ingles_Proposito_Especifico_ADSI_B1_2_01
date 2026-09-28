var DataBTMGeneral = {
  index : -1,
  prevIndex: -1,
  prevProgress: false,
  firstMessageDrag : "Some of these elements are used to build the machine.",
  instructionDrag: "Instruction: Move the required devices to the character. You have 20 seconds to complete it.",
  successMessage: "Well done, you know how to build machines for ",
  failureMessage: "Oops! Try again.",
  characters : [
    {
      progress : false,
      data : DataBTMGamer,
      description : "A gamer needs high quality images, perfect sound, a good clear area to play, and some devices to interact with her games.",
      charSpriteSmall : "buildTheMachine_charSmall_gamer.png",
      charSpriteLarge : "buildTheMachine_charLarge_gamer.png",
      charName : "Gamer",
      charNameSuccess: "Gamers",
      charNameTagSmall: "buildTheMachine_nameSmall_single.png",
      charNameTagLarge: "buildTheMachine_nameLarge_single.png",
      x: 400,
      y: 510
    },
    {
      progress : false,
      data : DataBTMDesigner,
      description : "A graphic designer needs high quality images, as well as external devices to store different kind of data and some devices to design and work.",
      charSpriteSmall : "buildTheMachine_charSmall_graphicDesigner.png",
      charSpriteLarge : "buildTheMachine_charLarge_graphicDesigner.png",
      charName: "Graphic\nDesigner",
      charNameSuccess: "Graphic Designers",
      charNameTagSmall: "buildTheMachine_nameSmall_double.png",
      charNameTagLarge: "buildTheMachine_nameLarge_double.png",
      x: 660,
      y: 360
    },
    {
      progress : false,
      data : DataBTMBusinessman,
      description : "A businessman needs a portable device with good storage capacity, and a simple device to interact with the documents.",
      charSpriteSmall : "buildTheMachine_charSmall_businessMan.png",
      charSpriteLarge : "buildTheMachine_charLarge_businessMan.png",
      charName: "Businessman",
      charNameSuccess: "Businessmen",
      charNameTagSmall: "buildTheMachine_nameSmall_single.png",
      charNameTagLarge: "buildTheMachine_nameLarge_single.png",
      x: 920,
      y: 510
    },
    {
      progress : false,
      data : DataBTMTeacher,
      description : "A virtual teacher needs a portable device with good internet connection and high storage capacity, as well as a device to talk and listen to their students and some basic devices to interact easier with the content. ",
      charSpriteSmall : "buildTheMachine_charSmall_virtualTeacher.png",
      charSpriteLarge : "buildTheMachine_charLarge_virtualTeacher.png",
      charName: "Virtual\nTeacher",
      charNameSuccess: "Virtual Teachers",
      charNameTagSmall: "buildTheMachine_nameSmall_double.png",
      charNameTagLarge: "buildTheMachine_nameLarge_double.png",
      x: 1180,
      y: 360
    },
    {
      progress : false,
      data : DataBTMStudent,
      description : "A student demands high storage capacity, as well as a portable device to study in different places; on the other hand, a student needs basic devices to listen to multimedia content.",
      charSpriteSmall : "buildTheMachine_charSmall_student.png",
      charSpriteLarge : "buildTheMachine_charLarge_student.png",
      charName: "Student",
      charNameSuccess: "Students",
      charNameTagSmall: "buildTheMachine_nameSmall_single.png",
      charNameTagLarge: "buildTheMachine_nameLarge_single.png",
      x: 1440,
      y: 510
    }
  ],
  timer : {
    timerAtlas : 'btm1',
    timerX : 1600,
    timerY : 30,
    timerHolderSpriteName : 'buildTheMachine_timer_base.png',
    timerSpriteName : 'buildTheMachine_timer_0001.png',
    initialTimer : 20
  },
  check : {
    checkAtlas : 'btm1',
    checkSprite : 'buildTheMachine_itemSmall_right.png'
  }
};