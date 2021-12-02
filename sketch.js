const TOTAL = 600;
var birds = [];
let savedBirds = [];
var pipes = [];
let brain;
let counter = 0;
let slider;
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
  createCanvas(640, 480);
  slider = createSlider(1, 10, 1);

  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
  // pipes.push(new Pipe());

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

  // brain = new NeuralNetwork(2, 4, 1);
  // console.log(brain);
  // let child = brain.copy();
  // child.mutate(0.01);
  // console.log(child);
}

function draw() {
  for (let n = 0; n < slider.value(); n++) {
    if (counter % 80 == 0) {
      pipes.push(new Pipe());
    }
    counter++;
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();

      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j])) {
          // birds.splice(j, 1);
          savedBirds.push(birds.splice(j, 1)[0]);
          // console.log("HIT");
        }
      }
      for (let i = birds.length - 1; i >= 0; i--) {
        if (birds[i].offScreen()) {
          // birds.splice(j, 1);
          savedBirds.push(birds.splice(i, 1)[0]);
          // console.log("HIT");
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    for (let bird of birds) {
      bird.think(pipes);
      bird.update();
    }
    if (birds.length === 0) {
      counter = 0;
      nextGeneration();
      pipes = [];
      pipes.push(new Pipe());
    }
  }
  background(0);

  for (let bird of birds) {
    bird.show();
  }
  for (let pipe of pipes) {
    pipe.show();
  }
}

// function keyPressed() {
//   if (key == " ") {
//     bird.up();
//   }
// }
