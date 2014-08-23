define(function(require, exports, module) {
  var Easing = require('famous/transitions/Easing');
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');

  var mainContext = Engine.createContext();
  
  var basePointX  = 0;
  var basePointY  = 100;
  var currentX    = 0;
  var currentY    = 0;
  var offsetX     = 0;
  var offsetY     = 0;
  var radius      = 0;
  var spiralCount = 4;
  var Constant    = 0.25;
  var angle       = 0;
  var deltaAngle  = 2;
  var maxAngle    = 721;
  var stripWidth  = 60;
  var stripCount  = Math.floor(maxAngle/stripWidth);
  var currStrip   = 0;

  var rectWidth=60, rectHeight=60;
  var offsetX=0, offsetY=0, shiftX=2*rectWidth, index=0;
  var color="", colors=["#FF0000","#0000FF","#FF00FF","#FF0000"];

  var hexArray    = new Array('0','1','2','3','4','5','6','7',
                              '8','9','a','b','c','d','e','f');

  for(angle=0; angle<maxAngle; angle+=deltaAngle) {
    radius   = Constant*angle;
    offsetX  = radius*Math.cos(angle*Math.PI/180);
    offsetY  = radius*Math.sin(angle*Math.PI/180);
    currentX = basePointX+offsetX;
    currentY = basePointY-offsetY;

    // alternate between red and blue
    index = Math.floor(angle/deltaAngle);

    currStrip = Math.floor(index/stripWidth);
    if(currStrip % 2 == 0) {
       color = '#' + hexArray[index%hexArray.length] +'00';
    } else {
       color = '#' + '00' + hexArray[index%hexArray.length];
    } 

    var surface = new Surface({
        size: [rectWidth, rectHeight],
        properties: {
            left: ((1+currStrip%2)*shiftX+currentX)+"px",
            top:  currentY+"px",
            backgroundColor: color,
            borderRadius:(angle%50)+'%'
        }
    });

    var rotateZ = new StateModifier({
      origin: [0.2,0.2],
      transform: Transform.rotateZ(angle*Math.PI/180)
    });

    mainContext.add(rotateZ).add(surface);
  }
});

