class ActivationFunction {
  constructor(func, dfunc) {
    this.func = func;
    this.dfunc = dfunc;
  }
}

let sigmoid = new ActivationFunction(
  (x) => 1 / (1 + Math.exp(-x)),
  (y) => y * (1 - y)
);

let tanh = new ActivationFunction(
  (x) => Math.tanh(x),
  (y) => 1 - y * y
);

class NeuralNetwork {
  constructor(a, b, c) {
    if (a instanceof NeuralNetwork) {
      this.input_nodes = a.input_nodes;
      this.hidden_nodes = a.hidden_nodes;
      this.output_nodes = a.output_nodes;

      this.weights_ih = a.weights_ih.copy();
      this.weights_ho = a.weights_ho.copy();

      this.bias_h = a.bias_h.copy();
      this.bias_o = a.bias_o.copy();
    } else {
      this.input_nodes = a;
      this.hidden_nodes = b;
      this.output_nodes = c;

      this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
      this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
      this.weights_ih.randomize();
      this.weights_ho.randomize();

      this.bias_h = new Matrix(this.hidden_nodes, 1);
      this.bias_o = new Matrix(this.output_nodes, 1);
      this.bias_h.randomize();
      this.bias_o.randomize();
    }
    this.setLearningRate();
    this.setActivationFunction();
  }

  setLearningRate(learning_rate = 0.1) {
    this.learning_rate = learning_rate;
  }

  setActivationFunction(func = sigmoid) {
    this.activation_function = func;
  }

  feedforward(intput_array) {
    //generating hidden outputs
    let inputs = Matrix.fromArray(intput_array);

    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);

    //activation function

    hidden.map(this.activation_function.func);

    //generating output
    let output = Matrix.multiply(this.weights_ho, hidden);

    output.add(this.bias_o);

    output.map(this.activation_function.func);

    // sending to next layer
    return output.toArray();
  }

  train(intput_array, target_array) {
    // console.log("here", intput_array);
    let inputs = Matrix.fromArray(intput_array);

    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);

    //activation function

    hidden.map(this.activation_function.func);

    //generating output
    let outputs = Matrix.multiply(this.weights_ho, hidden);

    outputs.add(this.bias_o);

    outputs.map(this.activation_function.func);

    // convert array to Matrix
    // outputs = Matrix.fromArray(outputs);
    let target = Matrix.fromArray(target_array);

    //calculate the errors
    let output_errors = Matrix.subtract(target, outputs);

    //calculate gradient
    let gradient = Matrix.map(outputs, this.activation_function.dfunc);
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
    let hidden_gradient = Matrix.map(hidden, this.activation_function.dfunc);
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

  copy() {
    //crossover
    return new NeuralNetwork(this);
  }

  mutate(rate) {
    function mutate(val) {
      if (Math.random() < rate) {
        return Math.random() * 2000 - 1;
      } else {
        return val;
      }
    }
    this.weights_ih.map(mutate);
    this.weights_ho.map(mutate);
    this.bias_h.map(mutate);
    this.bias_o.map(mutate);
  }
}
