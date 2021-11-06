class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;
  }
  show() {
    fill(255);
    ellipse(this.x, this.y, 32, 32);
  }
}
