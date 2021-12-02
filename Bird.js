class Bird {
  constructor(brain) {
    this.y = height / 2;
    this.x = 64;
    this.gravity = 0.6;
    this.lift = -16;
    this.velocity = 0;
    // how many iputs/hidden/output
    this.score = 0;
    this.fitness = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }
  }
  show() {
    stroke(255);
    fill(255, 50);
    ellipse(this.x, this.y, 32, 32);
  }

  up() {
    this.velocity += this.lift;
  }
  mutate() {
    this.brain.mutate(0.1);
  }
  think(pipes) {
    let inputs = [];
    // console.log(pipes[0].top);
    // console.log(pipes[0].bottom);
    // console.log(pipes[0].x);
    // console.log(pipes[0].top);
    let closest = null;
    let closestD = Infinity;
    // let closest = pipes[0];
    // let closestD = this.x - closest.x;
    for (let i = 0; i < pipes.length; i++) {
      let d = pipes[i].x + pipes[i].w - this.x;
      if (d < closestD && d > 0) {
        closest = pipes[i];
        closestD = d;
      }
    }

    inputs[0] = this.y / height;
    inputs[1] = closest.top / height;
    inputs[2] = closest.bottom / height;
    inputs[3] = closest.x / height;
    inputs[4] = this.velocity / 10;
    // let inputs = [1.0, 0.5, 0.2, 0.3];
    let output = this.brain.predict(inputs);
    // console.log(output);
    if (output[0] > output[1]) {
      this.up();
    }
  }

  offScreen() {
    return this.y > height || this.y < 0;
  }
  update() {
    this.score++;
    this.velocity += this.gravity;
    this.velocity += 0.3;
    this.y += this.velocity;

    // if (this.y > height) {
    //   this.y = height;
    //   this.velocity = 0;
    // }

    // if (this.y < 0) {
    //   this.y = 0;
    //   this.velocity = 0;
    // }
  }
}
