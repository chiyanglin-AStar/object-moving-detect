// ml5.js: Object Detection with COCO-SSD (Webcam)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/1.3-object-detection.html
// https://youtu.be/QEzRxnuaZCk

// p5.js Web Editor - Image: https://editor.p5js.org/codingtrain/sketches/ZNQQx2n5o
// p5.js Web Editor - Webcam: https://editor.p5js.org/codingtrain/sketches/VIYRpcME3
// p5.js Web Editor - Webcam Persistence: https://editor.p5js.org/codingtrain/sketches/Vt9xeTxWJ

// let img;
let video;
let detector;
let detections = [];

// For Camera Switch
var capture;
let switchFlag = false;
let switchBtn;

var options = {
     video: {

         facingMode: {
          exact: "user"
        }
     }
   };



function preload() {
  // img = loadImage('dog_cat.jpg');
  detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // For Switch Camera
  capture = createCapture(options);

  switchBtn = createButton('Switch Camera');
  switchBtn.position(19, 19);
  switchBtn.mousePressed(switchCamera);

  detector.detect(video, gotDetections);
}

function draw() {
  image(video, 0, 0);
  textSize(14);
  text(' detect length '+ detections.length ,  20, 24);

  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    let s = second();
    let millisecond = millis();

    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(14);
    text('Curr sec , ms :' + s+','+ millisecond.toFixed(1) +'\n',object.x + 10, object.y -25);
    text(' ('+ object.x.toFixed(1) +','+object.y.toFixed(1)+')',object.x + 10,object.y -10 );
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}


function switchCamera()
{
  switchFlag = !switchFlag;
  stopCapture();
  if(switchFlag==true)
  {
   capture.remove();
   options = {
     video: {
         facingMode: {
          exact: "environment"
        }
     }
   };

  }
  else
  {
   capture.remove();
   options = {
     video: {
         facingMode: {
          exact: "user"
        }
     }
   };
  }
  capture = createCapture(options);
}

function stopCapture() {
  let stream = capture.elt.srcObject;
  let tracks = stream.getTracks();

  tracks.forEach(function(track) {
    track.stop();
  });

  capture.elt.srcObject = null;
}
