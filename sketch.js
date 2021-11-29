var bird;
var pipes = [];
function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());

  let nn = new NeuralNetwork(2, 2, 1);
  let input = [1, 0];
  let output = nn.feedforward(input);
  console.log(output);
}

function draw() {
  background(0);

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    if (pipes[i].hits(bird)) {
      console.log("HIT");
    }
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
  if (frameCount % 80 == 0) {
    pipes.push(new Pipe());
  }
  bird.update();
  bird.show();
}

function keyPressed() {
  if (key == " ") {
    bird.up();
  }
}
