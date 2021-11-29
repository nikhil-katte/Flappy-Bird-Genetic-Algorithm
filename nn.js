function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function dsigmoid(y) {
  // return sigmoid(x) * (1 - sigmoid(x));
  return y * (1 - y);
}

class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    this.weights_ih.randomize();
    this.weights_ho.randomize();

    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.output_nodes, 1);
    this.bias_h.randomize();
    this.bias_o.randomize();
    this.learning_rate = 0.1;
  }

  feedforward(intput_array) {
    //generating hidden outputs
    let inputs = Matrix.fromArray(intput_array);

    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);

    //activation function

    hidden.map(sigmoid);

    //generating output
    let output = Matrix.multiply(this.weights_ho, hidden);

    output.add(this.bias_o);

    output.map(sigmoid);

    // sending to next layer
    return output.toArray();
  }

  train(intput_array, target_array) {
    // console.log("here", intput_array);
    let inputs = Matrix.fromArray(intput_array);

    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);

    //activation function

    hidden.map(sigmoid);

    //generating output
    let outputs = Matrix.multiply(this.weights_ho, hidden);

    outputs.add(this.bias_o);

    outputs.map(sigmoid);

    // convert array to Matrix
    // outputs = Matrix.fromArray(outputs);
    let target = Matrix.fromArray(target_array);

    //calculate the errors
    let output_errors = Matrix.subtract(target, outputs);

    //calculate gradient
    let gradient = Matrix.map(outputs, dsigmoid);
    gradient.multiply(output_errors);
    gradient.multiply(this.learning_rate);

    // calculate deltas
    let hidden_T = Matrix.transpose(hidden);
    let weight_ho_deltas = Matrix.multiply(gradient, hidden_T);

    //adjust weights by deltas and gradient
    this.weights_ho.add(weight_ho_deltas);
    this.bias_o.add(gradient);

    let who_t = Matrix.transpose(this.weights_ho);

    //calculate the hidden layer errors;
    let hidden_errors = Matrix.multiply(who_t, output_errors);

    // calculate hidden gradient
    let hidden_gradient = Matrix.map(hidden, dsigmoid);
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.learning_rate);

    // calculate input to hidden deltas
    let inputs_T = Matrix.transpose(inputs);
    let weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);

    //adjust weights by deltas and gradient
    this.weights_ih.add(weight_ih_deltas);
    this.bias_h.add(hidden_gradient);
    // hidden_errors.print();
    // outputs.print();
    // target.print();
    // error.print();
  }
}
