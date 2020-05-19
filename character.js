class Character {
  constructor(animation, speed, r = 77) {
    this.r = r;
    this.x = 50;
    this.y = height - this.r;
    this.vy = 0;
    this.gravity = 1.0;
    this.animation = animation;
    this.speed = speed;
    this.index = 0;
    // Private variable
    this._yConst = height - this.r;
  }

  jump() {
    this.vy = -15;
  }
  move() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, height - this.r);
  }
  walk() {
    this.frames = floor(this.index % this.animation.length);
  }
  show() {
    this._debug();
    image(this.animation[this.frames || 0], this.x, this.y);
  }
  animate(isPlay = true) {
    this.index += this.speed;
    this.frames = floor(this.index % this.animation.length);
  }
  hits(object){
    return collideRectRect(this.x,this.y,25,this.animation[this.frames || 0].height,object.x1,object.y,object.width,object.height);
  }
  getYPosition() {
    return this.y;
  }
  getYConstPosition() {
    return this._yConst;
  }
  _debug() {
    let c;
    c = color('rgb(255,255,255)');
    stroke(255, 0, 0);
    fill(c);
    rect(
      this.x,
      this.y,
      25  ,
      this.animation[this.frames || 0].height
    );

    c = color('rgb(255,0,0)');
    noStroke();
    fill(c);
    // text('Sprites', this.x, this.y - 5);
  }
}
