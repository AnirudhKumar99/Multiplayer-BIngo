class Bingo {
  constructor(id, size) {
    this.id = id;
    this.players = [];
    this.gameSize = size;
  }

  addPlayer() {
    const player = new Player(this.gameSize, this.players.length);
    this.players.push(player);
  }
  viewPlayers() {
    this.players.map((p) => p.viewBoard());
  }
  crossNumber(number){
      this.players.map((p)=>p.crossNumber(number))
      this.players.map((p)=>p.calculateScore())
      
  }
}

class Player {
  constructor(gamesize, id) {
    this.id = id;
    this.gameBoard = null;
    this.score = 0;
    this.gameSize = gamesize;
    this.createBoard();
  }
  createBoard() {
    let numbers = Array(this.gameSize ** 2)
      .fill()
      .map((_, idx) => idx + 1);
    // console.log(numbers)

    // SHUFFLING
    for (let i = 0; i < this.gameSize ** 2; i++) {
      let i1 = Math.floor(Math.random() * this.gameSize ** 2);
      let i2 = Math.floor(Math.random() * this.gameSize ** 2);
      let temp = numbers[i1];
      numbers[i1] = numbers[i2];
      numbers[i2] = temp;
    }

    // console.log(numbers);

    this.gameBoard = [];
    for (let i = 0; i < this.gameSize; i++) {
      let row = [];
      for (let j = 0; j < this.gameSize; j++) {
        const num = numbers[i * this.gameSize + j];
        const obj = { number: num, crossed: false };
        row.push(obj);
      }
      this.gameBoard.push(row);
    }
    // this.viewBoard();
  }
  viewBoard() {
    console.log("Id: ", this.id);
    console.table(this.gameBoard);
    console.log("Score: ", this.score);
  }
  crossNumber(number) {
    for (let i = 0; i < this.gameSize; i++) {
      for (let j = 0; j < this.gameSize; j++) {
        if (
          this.gameBoard[i][j]["number"] == number &&
          this.gameBoard[i][j]["crossed"] == false
        ) {
          this.gameBoard[i][j]["crossed"] = true;
          return true;
        }
      }
    }
    return false;
  }
  calculateScore() {
    this.score = 0;

    let d1Cross = true;
    let d2Cross = true;
    for (let i = 0; i < this.gameSize; i++) {
      let rowCross = true;
      let colCross = true;
      for (let j = 0; j < this.gameSize; j++) {
        rowCross = rowCross && this.gameBoard[i][j]["crossed"];
        colCross = colCross && this.gameBoard[j][i]["crossed"];
      }
      d1Cross = d1Cross && this.gameBoard[i][i]["crossed"];
      d2Cross = d2Cross && this.gameBoard[i][this.gameSize - i - 1]["crossed"];
      if (rowCross) this.score++;
      if (colCross) this.score++;
    }
    if (d1Cross) this.score++;
    if (d2Cross) this.score++;
  }
}

module.exports = { Bingo, Player };
