class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];
    for (let i = 0; i < this.rows; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }

  // transpose() {
  //   let result=new
  // }

  randomize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = Math.floor(Math.random() * 10);
      }
    }
  }

  add(n) {
    if (n instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] += n.matrix[i][j];
        }
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] += n;
        }
      }
    }
  }

  multiply(n) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols) {
        console.log(
          "Number of Columns and Rows of A must match Columns and Rows of B."
        );
        return;
      }
      let result = new Matrix(this, rows, n.cols);
      let a = this;
      let b = n;
      for (let i = 0; i < result.rows; i++) {
        for (let j = 0; j < result.cols; j++) {
          let sum = 0;
          for (let k = 0; k < a.cols; k++) {
            sum += a.matrix[i][k] * b.matrix[k][j];
          }
          result.matrix[i][j] = sum;
        }
      }

      // for (let i = 0; i < this.rows; i++) {
      //   for (let j = 0; j < this.cols; j++) {
      //     this.matrix[i][j] *= n.matrix[i][j];
      //   }
      // }
      return result;
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] *= n;
        }
      }
    }
  }
}
