class Icon {
  constructor(img, x1, y, width, height, speed) {
    this.image = img;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.y = y;
    this.x1 = x1;
  }
  draw() {
    this._debug();
    this.temp = image(this.image, this.x1, this.y, this.width, this.height);
  }
  move() {
    this.x1 -= this.speed;
  }
  _debug() {
    let c;
    c = color('rgb(255,255,255)');
    stroke(255, 0, 0);
    fill(c);
    rect(this.x1, this.y, this.width, this.height);

    c = color('rgb(255,0,0)');
    noStroke();
    fill(c);
    text(this.count, this.x1, this.y - 5);
  }
}
