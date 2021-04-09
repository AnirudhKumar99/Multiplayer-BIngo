// import Bingo from './bingo.js'
const { Bingo, Player } = require("./bingo");

const game = new Bingo(153, 5);
game.addPlayer();
game.addPlayer();
for (let i = 0; i < 100; i++) {
  let r = Math.floor(Math.random() * 25) + 1;
//   console.log(r);
  game.crossNumber(r);
}
game.viewPlayers();
