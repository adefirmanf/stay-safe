let play = true 
let invisible = false 
let character;

let spritesheet;
let spritedata;
let iconsheet;
let iconFrames;
let iconImg = {};

let bgImg = [];
let animation = [];
let font;

let x1 = 0;
let x2;

let apple = [];
let trap = [];

let score = 0;
let totalApple = 0
let life = 1

let maxJump = 1;
let currentJump = 0;

function preload() {
  spritesheet = loadImage('spritesheet.png');
  bgImg[0] = loadImage('./bg/Layer_0000_9.png');
  bgImg[1] = loadImage('./bg/Layer_0001_8.png');
  bgImg[2] = loadImage('./bg/Layer_0002_7.png');
  bgImg[3] = loadImage('./bg/Layer_0003_6.png');
  bgImg[4] = loadImage('./bg/Layer_0004_Lights.png');
  bgImg[5] = loadImage('./bg/Layer_0005_5.png');
  bgImg[6] = loadImage('./bg/Layer_0006_4.png');
  bgImg[7] = loadImage('./bg/Layer_0007_Lights.png');
  bgImg[8] = loadImage('./bg/Layer_0008_3.png');
  bgImg[9] = loadImage('./bg/Layer_0009_2.png');
  bgImg[10] = loadImage('./bg/Layer_0010_1.png');

  spritedata = loadJSON('sprites-walk.json');
  iconsheet = loadImage('icon-pack.png');
  icondata = loadJSON('icon-pack.json');
  font = loadFont('PIXELADE.TTF');
}

function setup() {
  frameRate(50);
  const w = 600;
  const h = 500;
  createCanvas(w, h);

  let frames = spritedata.sprite;
  let iconframes = icondata.sprite;

  frames.map((n) => {
    animation.push(spritesheet.get(n.x, n.y, n.width, n.height));
  });

  iconframes.map((n) => {
    iconImg[n.name] = iconsheet.get(n.x, n.y, n.width, n.height);
  });

  character = new Character(animation, 0.2);
  bgImg[0] = new Background(bgImg[0], 20, 0, width, 3, width);
  bgImg[1] = new Background(bgImg[1], 0, 0, width, 2.8, width);
  bgImg[2] = new Background(bgImg[2], 0, 0, width, 2.8, width);
  bgImg[3] = new Background(bgImg[3], 0, 0, width, 1.5, width);
  bgImg[4] = new Background(bgImg[4], 0, 0, width, 1, width);
  bgImg[5] = new Background(bgImg[5], 0, 0, width, 0.6, width);
  bgImg[6] = new Background(bgImg[6], 0, 0, width, 0.5, width);
  bgImg[7] = new Background(bgImg[7], 0, 0, width, 0.3, width);
  bgImg[8] = new Background(bgImg[8], 0, 0, width, 0.2, width);
  bgImg[9] = new Background(bgImg[9], 0, 0, width, 0.1, width);
  bgImg[10] = new Background(bgImg[10], 0, 0, width, 0, width);

  // for (let i = 0; i < 20; i++) {
  //   apple.push(
  //     new Icon(iconImg.apple, Math.floor(Math.random() * width + 100) + width),
  //     height - 50,
  //     iconImg.apple.width,
  //     iconImg.apple.height,
  //     2
  //   );
  // }
  // apple.push(new );

  textFont(font);
}

function keyPressed() {
  if (key == ' ' && !play){
    play = true 
    character.jump();
  }
  else if (key == ' ') {
    if (
      character.getYPosition() == character.getYConstPosition() ||
      currentJump < maxJump
    ) {
      currentJump += 1;
      character.jump();
      character.animate(false);
    }
  }
  if (keyCode == ENTER && !play){
    play = true
    character.jump(); 
    loop()
  }
}

function draw() {

  background(220);
  drawBg();

  if (play){
    drawTrap();
    drawApple();
    drawScore();
    drawLife();
    drawHealthBar();

    // When character hit the ground, reset currentJump
    if (character.getYPosition() == character.getYConstPosition()) {
      currentJump = 0;
    }
  
    drawCharacter();

    if (totalApple == 20 ){
      life += 1
      totalApple = 0
    }
  }
  else{
    // drawMenu();
  }
}

function drawCharacter() {
  character.show();
  character.animate();
  character.move();
}

function drawBg() {
  bgImg[10].draw();
  bgImg[9].draw();
  bgImg[1].draw();
  bgImg[8].draw();
  bgImg[5].draw();
  bgImg[4].draw();
  bgImg[6].draw();
  bgImg[7].draw();
  bgImg[0].draw();
  bgImg[2].draw();
  bgImg[3].draw();
}

function drawScore() {
  textAlign(CENTER)
  textSize(width - (width - 20));
  fill(220);
  score += 1
  text(`SCORE ${score}`, width - 50, height - (height - 25));
  // text(`${score}`, width - 10, height - (height - 25));
}
function drawHealthBar() {
  textAlign(LEFT)
  textSize(width - (width - 20));
  fill(220);
  score += 1;
  text(`APPLE ${totalApple}`, width - (width - 10), height - (height - 45));
}
function drawLife(){
  textAlign(LEFT)
  textSize(width - (width - 20));
  fill(220);
  text(`LIFE ${life}`, width - (width - 10), height - (height  - 25));
}
function drawTrap() {
  // image(iconImg.apple, 10, 10, iconImg.apple.width, iconImg.apple.height);
  if (random(1) < 0.009) {
    trap.push(
      new Icon(
        iconImg.trap,
        width,
        height - 40,
        iconImg.trap.width,
        iconImg.trap.height,
        3 
      )
    );
  }
  if (trap) {
    trap.map((n, i) => {
      let collideId = 0
      n.draw();
      n.move();

      // Memory optimization, delete after - n.x1 > width. 
      if (- n.x1 > width){
        trap.shift()
      }

      if (character.hits(n) && life == 0){
        play = false 
        textSize(24);
        fill(220);
        textAlign(CENTER)
        textLeading(90)
        text(`GAME OVER`, (width - 300), (height / 2));
        text(`PRESS CTRL + R TO RESTART`, (width - 300), (height / 2)+ 25);
        noLoop()
      }
      else if (character.hits(n)){
        life = life - 1
        trap.splice(i, 1)
      }
    });
  }
}

function drawApple() {
  if (random(1) < 0.009) {
    apple.push(
      new Icon(
        iconImg.apple,
        width,
        height - 200,
        iconImg.apple.width,
        iconImg.apple.height,
        4
      )
    );
  }
  if (apple) {
    apple.map((n, i) => {
      n.draw();
      n.move();

      // Memory optimization, delete after - n.x1 > width. 
      if (- n.x1 > width){
        apple.shift()
      }

      // When character get apple, score should be added 
      if (character.hits(n)){
        totalApple += 1
        apple.splice(i, 1)
      }
    });
  }
}

function drawMenu(){
  // Title Menu
  textSize(width - 500);
  fill(220);
  textAlign(CENTER)
  textLeading(90)
  text(`Stay \nSafe`, (width - 300), (height / 2) - 10);

  // Blink space bar
  textSize(24);
  fill(220);
  textAlign(CENTER)
  textLeading(90)
  text(`PRESS SPACEBAR TO START`, (width - 300), (height / 2) + 125);

  textSize(16);
  fill(220);
  textAlign(CENTER)
  textLeading(90)
  text(`RIZKA - 41517110057       ADE - 41517110172      NURDIN - 41517110089       ARYANDA - 41517110140`, (width - 300), (height / 2) + 225);
}
