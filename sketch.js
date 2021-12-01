var bird;
var pipes = [];
let brain;
// let training_data = [
//   {
//     inputs: [0, 1],
//     targets: [1],
//   },
//   {
//     inputs: [1, 0],
//     targets: [1],
//   },
//   {
//     inputs: [0, 0],
//     targets: [0],
//   },
//   {
//     inputs: [1, 1],
//     targets: [0],
//   },
// ];
function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());

  // let nn = new NeuralNetwork(2, 2, 1);
  // for (let i = 0; i < 100000; i++) {
  //   for (data of training_data) {
  //     nn.train(data.inputs, data.targets);
  //   }
  // }
  // console.log(nn.feedforward([1, 0]));
  // console.log(nn.feedforward([0, 1]));
  // console.log(nn.feedforward([1, 1]));
  // console.log(nn.feedforward([0, 0]));

  // nn.train(inputs, targets);

  brain = new NeuralNetwork(2, 4, 1);
  console.log(brain);
  let child = brain.copy();
  child.mutate(0.01);
  console.log(child);
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
