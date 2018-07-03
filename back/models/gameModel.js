const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cards = require("./cards");


mongoose.connect('mongodb://database-user:test@ds119930.mlab.com:19930/suipi-game-db');

const gameSchema = new Schema({
  gameDeck: new Cards.deck,
  gameId: new Cards.gameId,
  gameEnd: {
    type: Boolean,
    default: false
  },
  player1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    default: null
  },
  player2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    default: null
  },
  player3: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    default: null
  },
  player4: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    default: null
  },
  board: [],
  kitty: []
});

gameSchema.methods.simpleGame = function () {
  return {
  }
}

var Game = mongoose.model('Game', gameSchema);

module.exports = { Game: Game };
