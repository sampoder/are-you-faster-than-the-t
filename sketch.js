let sx = 0;
let sy = 0;
let tx = null;
let ty = null;
let tr = 0;
let base_pos_x = -243;
let base_pos_y = -2360;
let r = 0;
let i = 0;
let t_catchup = 0;
let moves = 0;
let fontRegular;
let fontBold;
let station;

let gateOpenedAt = null;   // timestamp when gates fully open
let gateDelay = 500;       // half a second delay before stage transition

let subwayZero;

let subwayFifteen;

let subwayTwenty;

let subwayThirty;

let subwayFortyFive;

let subwayFifty;

let subwaySixty;

let subwayNegThirty;

let subwayNegTwenty;

let subwayNegEight;

let mascots;

let car;
let carTilt;
let bear;

let beaver;

let header;

let bgMusic;

function preload() {
  bgMusic = loadSound('mbta.mp3'); // put your file path here
}

function getSubwayImage(r) {
  if(r == 0){
    return subwayZero
  } else if (r == -8) {
    return subwayNegEight
  } else if(r == 15) {
    return subwayFifteen
  } else if(r == 20) {
    return subwayTwenty
  } else if (r == -20) {
    return subwayNegTwenty
  } else if (r == -30) {
    return subwayNegThirty
  } else if (r == 30) {
    return subwayThirty
  } else if (r == 45) {
    return subwayFortyFive
  } else if (r == 50) {
    return subwayFifty
  }  else if (r == 60) {
    return subwaySixty
  } 
}

function getCarImage(r) {
  if(r == 0){
    return car
  } else if (r == -8) {
    return car
  } else if(r == 15) {
    return car
  } else if(r == 20) {
    return car
  } else if (r == -20) {
    return car
  } else if (r == -30) {
    return carTilt
  } else if (r == 30) {
    return carTilt
  } else if (r == 45) {
    return carTilt
  } else if (r == 50) {
    return carTilt
  }  else if (r == 60) {
    return carTilt
  } 
}

let stations = {
  0: "Boston College",
  160: "South St",
  261: "Chestnut Hill Ave",
  308: "Chiswick Rd",
  376: "Sutherland Rd",
  444: "Washington St",
  553: "Warren St",
  597: "Allston St",
  666: "Griggs St",
  715: "Havard Ave",
  822: "Packard’s Corner",
  915: "Babcock St",
  1014: "Amory St",
  1173: "BU Central",
  1227: "BU East",
  1283: "Blandford St",
  1404: "Kenmore",
  1456: "Hynes Convention Ctr.",
  1650: "Copley",
  1803: "Arlington",
  1919: "Bolyston St"
}


// jump logic
let isJumping = false;
let jumpVel = 0;
let gravity = 1.2;
let jumpStrength = -15;
let groundY = 300;
let mascotY = groundY;
let jumpProgress = 0;

let steps = [
  {
    y: 0,
    x: 0,
    r: 0,
  },
  ...Array.from({ length: 152 }, () => ({ // 152
    y: -3,
    x: (15/152),
    r: 0,
  })),
  ...Array.from({ length: 92 }, () => ({
    y: -3,
    x: (148/92),
    r: -30
  })), 
  ...Array.from({ length: 3 }, () => ({ // 152
    y: -3,
    x: 0,
    r: 50
  })),
  ...Array.from({ length: 57 }, () => ({
    y: -3,
    x: -(222/57),
    r: 50
  })),
  ...Array.from({ length: 69 }, () => ({
    y: -3,
    x: -(41/69),
    r: 20
  })),
  ...Array.from({ length: 48 }, () => ({
    y: -3,
    x: -(70/48),
    r: 30
  })),
  ...Array.from({ length: 21 }, () => ({
    y: -3,
    x: -(95/21),
    r: 50
  })),
  ...Array.from({ length: 80 }, () => ({
    y: -1.5,
    x: -(238/80),
    r: 60
  })),
  ...Array.from({ length: 30 }, () => ({
    y: -1.5,
    x: -(141/30),
    r: 60
  })),
  ...Array.from({ length: 34 }, () => ({
    y: -3,
    x: (24/34),
    r: -8
  })),
  ...Array.from({ length: 34 }, () => ({
    y: -3,
    x: (28/34),
    r: -8
  })),
  ...Array.from({ length: 43 }, () => ({
    y: -3,
    x: -(76/43),
    r: 20
  })),
  ...Array.from({ length: 46 }, () => ({
    y: -3,
    x: -(90/46),
    r: 20
  })),
  ...Array.from({ length: 36 }, () => ({
    y: -3,
    x: -(15/36),
    r: -8
  })),
  ...Array.from({ length: 44 }, () => ({
    y: -3,
    x: -(3/44),
    r: -8
  })),
  ...Array.from({ length: 33 }, () => ({
    y: -3,
    x: -(99/33),
    r: 45
  })),
  ...Array.from({ length: 21 }, () => ({
    y: -3,
    x: -(20/21),
    r: -8
  })),
  ...Array.from({ length: 21 }, () => ({
    y: -3,
    x: (24/21),
    r: -8
  })),
  ...Array.from({ length: 471 }, () => ({
    y: -3,
    x: (236/471),
    r: -8
  })),
  ...Array.from({ length: 65 }, () => ({
    y: -3,
    x: 0,
    r: 0
  })),
  ...Array.from({ length: 57 }, () => ({
    y: -3,
    x: (71/57),
    r: -30
  })),
  ...Array.from({ length: 401 }, () => ({
    y: -3,
    x: -(364/401),
    r: 20
  })),
  ...Array.from({ length: 67 }, () => ({
    y: -3,
    x: (35/67),
    r: -8
  })),
  ...Array.from({ length: 5 }, () => ({
    y: 0,
    x: -5,
    r: 0
  })),
  {
    done: true
  }
]

let boxSize = 20;
let showGreenCircle = false;
let showStartPopup = true;
let charlieImg;
let leftFareGate;
let rightFareGate; 
let otherGates;
let cardTap;
let dead = false;

let showEndPopup = false; 
let showWinPopup = false;

let deadNotif;
let winNotif;

let overlayTitle;

// Squares that trigger end/win
let endTriggerX = 300, endTriggerY = 400, endTriggerSize = 50;
let winTriggerX = 800, winTriggerY = 300, winTriggerSize = 50;

let splitAmount = 0;     
let triggered = false;  
let map_img;
let subway_img;
let done = false;

let obstacles = [];

function setup() {
  createCanvas(900, 600);
  map_img = loadImage("/map.png");
  car = loadImage("/car.png");
  bear = loadImage("/bear.png");
  beaver = loadImage("/beaver.png");
  carTilt = loadImage("/carTilt.png");
  subwayZero = loadImage("/subwayZero.png");
  subwayFifteen = loadImage("/subwayFifteen.png");
  subwayThirty = loadImage("/subwayThirty.png");
  subwayNegThirty = loadImage("/subwayNegThirty.png");
  subwayNegTwenty = loadImage("/subwayNegTwenty.png");
  subwayTwenty = loadImage("/subwayTwenty.png");
  subwayNegEight = loadImage("/subwayNegEight.png");
  subwayFortyFive = loadImage("/subwayFortyFive.png");
  subwayFifty = loadImage("/subwayFifty.png");
  subwaySixty = loadImage("/subwaySixty.png");
  charlieImg = loadImage('visual-assets/charlie.png');
  leftFareGate = loadImage('visual-assets/left-fare-gate.png');
  rightFareGate = loadImage('visual-assets/right-fare-gate.png');
  otherGates = loadImage("visual-assets/turnstiles.png");
  header = loadImage("visual-assets/header.png");
  
  cardTap = loadImage("visual-assets/tap.png");
  deadNotif = loadImage("visual-assets/deadNotif.png");
  winNotif = loadImage("visual-assets/winNotif.png");
  overlayTitle = loadImage("visual-assets/overlayTitle.png");
  mascots = [
    loadImage("sprites/one.png"),
    loadImage("sprites/two.png"),
    loadImage("sprites/three.png"),
    loadImage("sprites/four.png"),
  ]
  fontRegular = loadFont("visual-assets/HelveticaNeueRoman.otf")
  fontBold = loadFont("visual-assets/HelveticaNeueBold.otf")
  
  generateObstacles()

  bgMusic.loop();       // loop continuously
  bgMusic.setVolume(0.5); // optional, lower the volume
}

function generateObstacles() {
  obstacles = [];
  let lastObstacleStep = -50; // last step where an obstacle was placed
  let minGap = 80;            // minimum number of steps between obstacles
  let types = ["car", "bear", "beaver"];
  let typeIndex = 0;          // cycle through types evenly

  steps.forEach((step, i) => {
    if (i <= 200) return; // skip early steps

    // enforce minimum gap between obstacles
    if (i - lastObstacleStep < minGap) return;

    // random chance to place an obstacle
    if (Math.random() < 0.01) { // adjust for overall sparsity
      let type = types[typeIndex % types.length];
      typeIndex++; // move to next type for next obstacle

      obstacles.push({ i, type });
      lastObstacleStep = i; // update last step used
    }
  });
}


let trailing = 80
let stage = 0;

function draw() {
  if(stage == 0) {
    zero()
  } else if(stage == 1) {
    one()
  }
}

function zero() {
  imageMode(CENTER);
  background(255);
  map_img.resize(3600, 0)
  image(map_img, base_pos_x - sx, base_pos_y - sy);

  let centerX = width / 2;
  let centerY = height / 2;

  if (!showEndPopup && !showWinPopup) {
    // --- Charlie card scanner ---
    let rightX = centerX + 150;
    let rightY = centerY - boxSize / 2;

    let tapOffsetX = ((55 + boxSize / 2) / 2) - 45;
    let tapOffsetY = 190 + boxSize / 2- 50;
    let tapW = 50;
    let tapH = 40;

    // Trigger hover detection
    if (!triggered &&
        mouseX > rightX + tapOffsetX - tapW/2 &&
        mouseX < rightX + tapOffsetX + tapW/2 &&
        mouseY > rightY + tapOffsetY - tapH/2 &&
        mouseY < rightY + tapOffsetY + tapH/2) {
      triggered = true;
    }

    // Animate gates
    splitAmount = triggered ? lerp(splitAmount, 1, 0.25) : lerp(splitAmount, 0, 0.25);
    
    if (splitAmount > 0.995) {
      if (gateOpenedAt === null) {
        gateOpenedAt = millis();  // mark the moment the gates opened
      }
      if (millis() - gateOpenedAt > gateDelay) {
        stage = 1;                // only switch after delay
        gateOpenedAt = null;      // reset for next run
      }
    }


    // header 
    let headerW = width;
    let headerH = header.height * (headerW / header.width);
    image(header, width / 2, headerH / 2, headerW, headerH);


    // --- Draw gates ---
    let maxGap = 200;
    let gap = maxGap * splitAmount;

    let desiredGateH = min(leftFareGate.height, height * 0.9);
    let gateScale = desiredGateH / leftFareGate.height;
    let gateH = leftFareGate.height * gateScale;
    let gateW = leftFareGate.width * gateScale;
    let gateY = height - gateH / 2 + 95;

    let leftGateX = centerX - gap/2 - gateW/2 - 13;
    let rightGateXPos = centerX + gap/2 + gateW/2 - 5;

    image(leftFareGate, leftGateX, gateY, gateW, gateH);
    image(rightFareGate, rightGateXPos, gateY, gateW, gateH);

    let otherScale = gateH / otherGates.height;
    let otherW = otherGates.width * otherScale;
    image(otherGates, centerX, gateY, otherW, gateH);

    // --- Draw cardTap and Charlie card ---
    image(cardTap, rightX - tapOffsetX, rightY + tapOffsetY, tapW, tapH);

    if (showGreenCircle && !showStartPopup && splitAmount < 0.99) {
      image(charlieImg, mouseX, mouseY, 120, 73);
    }
  }

  // --- Start popup ---
  if (showStartPopup) {
    fill(128, 128, 128, 180);
    rect(0, 0, width, height);

    fill(255);
    stroke(0);
    strokeWeight(2);
    let popupW = 842, popupH = 250;
    let popupX = width/2 - popupW/2;
    let popupY = height/2 - popupH/2;
    rect(popupX, popupY, popupW, popupH);

    image(overlayTitle, width/2, popupY + 70, 850, 140);

    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20);
    textStyle(BOLD);
    textFont(fontRegular);
    text("Press SPACE to begin! Scan to enter the platform.", width/2, popupY + 180);
  }

  // --- End/Win popups ---
  if (showEndPopup) {
    image(deadNotif, width/2, height/2, 800, 240);
    drawResetButton(width/2, height/2 + 180);
  }
  if (showWinPopup) {
    image(winNotif, width/2, height/2, 800, 240);
    drawResetButton(width/2, height/2 + 180);
  }
}

// --- Reset button ---
let buttonPressed = false;
function drawResetButton(centerX, centerY) {
  let btnW = 150, btnH = 40;
  let scaleFactor = buttonPressed ? 0.95 : 1;
  let scaledW = btnW * scaleFactor;
  let scaledH = btnH * scaleFactor;
  showGreenCircle = false;

  let hovering = mouseX > centerX - scaledW/2 && mouseX < centerX + scaledW/2 &&
                 mouseY > centerY && mouseY < centerY + scaledH;

  fill(hovering ? color('#555555ff') : color('black'));
  rect(centerX - scaledW/2, centerY, scaledW, scaledH, 4);

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  textFont('Helvetica Neue');
  text("PLAY AGAIN", centerX, centerY + scaledH/2);
}

// --- Mouse events ---
function mousePressed() {
  if ((showEndPopup || showWinPopup) &&
      mouseX > width/2 - 75 && mouseX < width/2 + 75 &&
      mouseY > height/2 + 180 && mouseY < height/2 + 220) {
    buttonPressed = true;
  }
}
function mouseReleased() {
  if (buttonPressed) {
    buttonPressed = false;
    if (mouseX > width/2 - 75 && mouseX < width/2 + 75 &&
        mouseY > height/2 + 180 && mouseY < height/2 + 220) {
      resetGame();
    }
  }
}

// --- Reset game ---
function resetGame() {
  showEndPopup = false;
  showWinPopup = false;
  triggered = false;
  splitAmount = 0;
  showGreenCircle = true;
  showStartPopup = false;
  i = 0;
  sx = 0;
  sy = 0;
  tx = null;
  ty = null;
  tr = 0;
  r = 0;
  t_catchup = 0;
  done = false;
  dead = false;
  gateOpenedAt = null;
  generateObstacles();
}

function keyPressed() {
  if (key === ' ') {
    if (showStartPopup) {
      showStartPopup = false;
      showGreenCircle = true;
    } else if (!isJumping && stage === 1) {
      isJumping = true;
      jumpVel = jumpStrength;
    } else {
      showGreenCircle = !showGreenCircle;
    }
  }
}


function one() {
  if(t_catchup > trailing || dead) {
    stage = 0;
    showEndPopup = true;
    return;
  }
  
  if(done) {
    stage = 0;
    showWinPopup = true;
    return;
  }
  
  background(255);
  imageMode(CENTER);



  // --- Handle player movement ---
  if ((keyIsDown(UP_ARROW) && i < steps.length) || i === 0) {
    let step = steps[i];
    if(step.done) {
      done = true;
      background('green');
      return;
    }
    if(stations[i]) {
      station = stations[i];
    }
    sy += step.y;
    sx += step.x;
    i += 1;
    if(i % 4 === 0) {
      moves += 1;
    }
  } else if (i > trailing) {
    t_catchup += 1;
  }

  if (i > trailing) {
    let slice = steps.slice(i - trailing + t_catchup, i);
    tx = slice.reduce((acc, step) => acc + step.x, 0);
    ty = slice.reduce((acc, step) => acc + step.y, 0);
    tr = slice.length > 0 ? slice[0].r : 0;
  }


  // --- Jump physics ---
  if (isJumping) {
    // Vertical arc only
    mascotY += jumpVel;
    jumpVel += gravity;

    if (i < steps.length) {
            let step = steps[i];
            sx += step.x; // full step forward
            sy += step.y; // full step up/down
            i += 1;       // increment integer index
            if (i % 4 === 0) moves += 1; // maintain running animation
            if (step.done) {
                done = true;
            }
        }

    // Landing check
    if (mascotY >= groundY) {
      mascotY = groundY;
      isJumping = false;
      jumpVel = 0;
    }
  }






  // --- Draw map ---
  map_img.resize(3600, 0);
  image(map_img, base_pos_x - sx, base_pos_y - sy);


  // --- Draw and check obstacles ---
  obstacles.forEach(obs => {
    if (obs.i < i) return; // obstacle is behind the player

    if (i > obs.i && !obs.passed) return;

    // Calculate relative position
    let stepsToGetTo = steps.slice(i - 1, obs.i + 1);
    let obs_x = stepsToGetTo.reduce((acc, step) => acc + step.x, 0);
    let obs_y = stepsToGetTo.reduce((acc, step) => acc + step.y, 0);

    const COLLIDE_RANGE = 50; // adjust collision sensitivity
    let collided = abs(obs_x) < COLLIDE_RANGE && abs(obs_y) < COLLIDE_RANGE && !isJumping;

    if (obs.type === "car") {
      let carImage = getCarImage(steps[obs.i].r);
      let carW = Math.abs(steps[obs.i].r) > 25 ? 120 : 0;
      let carH = Math.abs(steps[obs.i].r) > 25 ? 0 : 120;
      carImage.resize(carW, carH);

      // Flicker effect
      if(frameCount % 100 > 40) {
        tint(255, 65);
      } else {
        tint(255, 255);
        if(collided) {
          stage = 0;
          showEndPopup = true;
          dead = true;
          return;
        }
      }
      image(carImage, 450 + obs_x, 300 + obs_y);
      tint(255, 255);

    } else if (obs.type === "bear") {
      bear.resize(60, 0);
      image(bear, 450 + obs_x, 300 + obs_y);
      if(collided) {
        stage = 0;
        showEndPopup = true;
        dead = true;
        return;
      }

    } else if (obs.type === "beaver") {
      beaver.resize(60, 0);
      image(beaver, 450 + obs_x, 300 + obs_y);
      if(collided) {
        stage = 0;
        showEndPopup = true;
        dead = true;
        return;
      }
    }
  });

    // --- Draw mascot ---
  let mascot = isJumping ? mascots[0] : mascots[moves % 4];
  mascot.resize(90, 0);
  image(mascot, 450, mascotY);

  // --- Draw subway ---
  let subway_img = getSubwayImage(tr || 0);
  subway_img.resize(tr >= 45 ? 200 : 0, tr >= 45 ? 0 : 200);
  if(tx != null) {
    image(subway_img, max(450 - tx, 0), max(305 - ty, 0));
  }


  // --- HUD ---
  stroke(0);
  strokeWeight(2);
  fill('#00843d');
  rect(20, 60, 250, 30);
  fill('white');
  rect(20, 90, 250, 30);
  
  fill('white');
  rect(20, 490, 250, 50);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(20);
  textFont(fontBold);
  text(`${station}`, 20 + 125, 75);
  textSize(13);
  fill('black');
  text(`GREEN LINE - PARK ST & NORTH`, 20 + 125, 105);
  text(`UP TO RUN`, 20 + 125, 505);
  text(`SPACE TO JUMP`, 20 + 125, 525);
}


window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);