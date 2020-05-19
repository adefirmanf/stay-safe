class Background {
  constructor(img, y, x1, x2, speed) {
    this.image = img;
    this.speed = speed;
    this.y = y;
    this.x1 = x1;
    this.x2 = x2;
  }
  draw() {
    image(this.image, this.x1, this.y, width + 10, height);
    image(this.image, this.x2, this.y, width + 10, height);

    this.x1 -= this.speed;
    this.x2 -= this.speed;

    if (this.x1 < -width) {
      this.x1 = width;
    }
    if (this.x2 < -width) {
      this.x2 = width;
    }
  }
}
