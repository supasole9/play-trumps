const Cards = require("./cards");

const GAME_LIST = [];

const gameDeal = function (game) {
  let i = 0;
  while (i < 12){
    game.player1.hand.push(game.gameDeck[i]);
    game.gameDeck.splice(i, 1);
    game.player2.hand.push(game.gameDeck[i]);
    game.gameDeck.splice(i, 1);
    game.player3.hand.push(game.gameDeck[i]);
    game.gameDeck.splice(i, 1);
    game.player4.hand.push(game.gameDeck[i]);
    i++;
  }
  for (let j = 0; j < 4; j++){
    game.kitty.push(game.gameDeck[j]);
      game.gameDeck.splice(j, 1);
  }
}

function Player (ws) {
  this.playerName = null,
  this.ws = ws,
  this.hand = [],
  this.gameID = null
}

function Game(p1) {
  this.gameDeck = new Cards.deck,
  this.gameEnd = false,
  this.player1 = p1,
  this.player2 = new Player(),
  this.player3 = new Player(),
  this.player4 = new Player(),
  this.board = [],
  this.kitty = [],
  this.gameID = gameid()
};

function gameid() {
  let string = "";
  let alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 6; i++) {
    string += alphabets.charAt(Math.floor(Math.random() * alphabets.length ));
  }
  return string
};

const Check = function (data, ws) {
  if (data.action == "NewGame") {
    let p = new Player(ws);
    confirmSignIn(data, ws);
    let newGame = new Game(p);
    GAME_LIST.push(newGame);
    gameDeal(newGame);
    ws.send(JSON.stringify( {action: "newGame", gameID: newGame.gameID, hand: newGame.player1.hand}));
  } else if (data.action == "Submit-Card") {
    submitCard(data, ws);
  }
};

const confirmSignIn = function (playerData, websocket) {
  websocket.send(JSON.stringify({
    action: "signupSuccess"
  }))
};

const gamefind = function (person) {
  var newGame = new Game();
  GAME_LIST.push(newGame);
  gameDeal(newGame.gameDeck, pp, person, newGame)
  newGame.player1.ws.send(JSON.stringify( {action: "newGame", gameID: newGame.gameID, opponentName: person.name, hand1: newGame.player1.hand, hand2: newGame.player2.hand, hand3: newGame.player3.hand, hand4: newGame.player4.hand, board: newGame.board}));
  // newGame.player2.ws.send(JSON.stringify( {action: "newGame", gameID: newGame.gameID, opponentName: pp.name, hand: person.hand, board: newGame.board} ));
};

const submitCard = function (data, ws) {
  for (let i = 0; i < GAME_LIST.length; i++) {
    if (GAME_LIST[i].gameID == data.gameId) {
      if (GAME_LIST[i].player1.ws == ws) {
        for (let j = 0; j < GAME_LIST[i].player1.hand.length; j++ ) {
          if (GAME_LIST[i].player1.hand[j].id == data.card.id) {
            let tempCard = GAME_LIST[i].player1.hand[j];
            GAME_LIST[i].player1.hand.splice(j, 1);
            GAME_LIST[i].board.push(tempCard);
            ws.send(JSON.stringify( {action: "playedCard", board: GAME_LIST[i].board, hand: GAME_LIST[i].player1.hand}));
          }
        }
      } else if (GAME_LIST[i].player2.ws == ws) {
        if (GAME_LIST[i].player2.hand[j].id == data.card.id) {
          let tempCard = GAME_LIST[i].player1.hand[j];
          GAME_LIST[i].player1.hand.splice(j, 1);
          GAME_LIST[i].board.push(tempCard);
          ws.send(JSON.stringify( {action: "playedCard", board: GAME_LIST[i].board, hand: GAME_LIST[i].player2.hand}));
        }
      } else if (GAME_LIST[i].player3.ws == ws) {
        if (GAME_LIST[i].player3.hand[j].id == data.card.id) {
          let tempCard = GAME_LIST[i].player1.hand[j];
          GAME_LIST[i].player1.hand.splice(j, 1);
          GAME_LIST[i].board.push(tempCard);
          ws.send(JSON.stringify( {action: "playedCard", board: GAME_LIST[i].board, hand: GAME_LIST[i].player3.hand}));
        }
      } else if (GAME_LIST[i].player4.ws == ws) {
        if (GAME_LIST[i].player4.hand[j].id == data.card.id) {
          let tempCard = GAME_LIST[i].player1.hand[j];
          GAME_LIST[i].player1.hand.splice(j, 1);
          GAME_LIST[i].board.push(tempCard);
          ws.send(JSON.stringify( {action: "playedCard", board: GAME_LIST[i].board, hand: GAME_LIST[i].player4.hand}));
        }
      }
    }
  }
};

function remove(array, element) {
  let pos = 0;
  for (let i = 0; i < array.length; i++) {
    if (element.id == array[i].id){
      console.log(i)
      pos = i;
      break;
    }
  }
  array.splice(pos, 1);
};

module.exports = {check: Check}
