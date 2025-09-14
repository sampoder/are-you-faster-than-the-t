let sx = 0;
let sy = 0;
let tx = null;
let ty = null;
let base_pos_x = -243;
let base_pos_y = -2360;
let r = 0;
let i = 0;
let t_catchup = 0;

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
    r: 0
  })), 
  ...Array.from({ length: 3 }, () => ({ // 152
    y: -3,
    x: 0,
    r: 0,
    base_pos_x: null,
    base_pos_y: null,
  })),
  ...Array.from({ length: 57 }, () => ({
    y: -3,
    x: -(222/57),
    r: 0
  })),
  ...Array.from({ length: 69 }, () => ({
    y: -3,
    x: -(41/69),
    r: 0
  })),
  ...Array.from({ length: 48 }, () => ({
    y: -3,
    x: -(70/48),
    r: 0
  })),
  ...Array.from({ length: 21 }, () => ({
    y: -3,
    x: -(95/21),
    r: 0
  })),
  ...Array.from({ length: 80 }, () => ({
    y: -1.5,
    x: -(238/80),
    r: 0
  })),
  ...Array.from({ length: 30 }, () => ({
    y: -1.5,
    x: -(141/30),
    r: 0
  })),
  ...Array.from({ length: 34 }, () => ({
    y: -3,
    x: (24/34),
    r: 0
  })),
  ...Array.from({ length: 34 }, () => ({
    y: -3,
    x: (28/34),
    r: 0
  })),
  ...Array.from({ length: 43 }, () => ({
    y: -3,
    x: -(76/43),
    r: 0
  })),
  ...Array.from({ length: 46 }, () => ({
    y: -3,
    x: -(90/46),
    r: 0
  })),
  ...Array.from({ length: 36 }, () => ({
    y: -3,
    x: -(15/36),
    r: 0
  })),
  ...Array.from({ length: 44 }, () => ({
    y: -3,
    x: -(3/44),
    r: 0
  })),
  ...Array.from({ length: 33 }, () => ({
    y: -3,
    x: -(99/33),
    r: 0
  })),
  ...Array.from({ length: 21 }, () => ({
    y: -3,
    x: -(20/21),
    r: 0
  })),
  ...Array.from({ length: 21 }, () => ({
    y: -3,
    x: (24/21),
    r: 0
  })),
  ...Array.from({ length: 471 }, () => ({
    y: -3,
    x: (236/471),
    r: 0
  })),
  ...Array.from({ length: 65 }, () => ({
    y: -3,
    x: 0,
    r: 0
  })),
  ...Array.from({ length: 57 }, () => ({
    y: -3,
    x: (71/57),
    r: 0
  })),
  ...Array.from({ length: 401 }, () => ({
    y: -3,
    x: -(364/401),
    r: 0
  })),
  ...Array.from({ length: 67 }, () => ({
    y: -3,
    x: (35/67),
    r: 0
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

let dead = false;

let rotateDeg = null;

console.log(steps)

let map_img;

let done = false;

function setup() {
  createCanvas(900, 600);
  map_img = loadImage("/map.png");
}

function draw() {
  if(t_catchup > 40) {
    background('red');
    return;
  }
  
  if(done) {
    background('green');
    return;
  }
  
  background(255);
  imageMode(CENTER);
  
  
  
  if ((keyIsDown(UP_ARROW) && i < steps.length) || i == 0) {
    let step = steps[i]
    if(step.done) {
      done = true;
      background('green');
      return;
    }
    sy = sy + step.y;
    sx = sx + step.x;
    i = i + 1
  } else if (i > 40) {
    t_catchup = t_catchup + 1
  }
  
  if (i > 40) {
    tx = steps.slice(i - 40 + t_catchup, i).reduce(
      (accumulator, step) => accumulator + step.x,
      0,
    )
    ty = steps.slice(i - 40 + t_catchup, i).reduce(
      (accumulator, step) => accumulator + step.y,
      0,
    )
    console.log(tx)
    console.log(ty)
  }
  
  map_img.resize(3600, 0)
  image(map_img, base_pos_x - sx, base_pos_y - sy);
  fill('red')
  circle(450, 300, 30)
  if(tx != null) {
    fill('blue')
    circle(max(450 - tx, 0), max(300 - ty, 0), 30)
  }
}

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);