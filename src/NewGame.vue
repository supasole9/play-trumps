<template>
  <div class="game">
    <div>
      <button v-if="game" v-on:click="newGAME">Start</button>
    </div>
    <div class="board" v-for="card in board" v-bind:key="card.id">
      <card :card="card"
        :name="card.name"
        :suit="card.suit"
        :value="card.value"
        :symbol="card.symbol"
      ></card>
    </div>
    <div class="hand">
      <div>
        <hand :Hi = this.player
        v-on:playCard="ShowCard($event)"
        ></hand>
      </div>
    </div>
  </div>
</template>

<script>
import Hand from "./hand.vue";
import Card from "./card.vue";

export default {
  name: 'game',
  data () {
    return {
      player: [],
      board: [],
      game: true,
      showOption: false,
      gameId: null,
      socket: null,
      gameId: null
    }
  },
  methods: {
    newGAME: function () {
      let thisState = this;
      fetch("http://localhost:9090/games", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function(res){
        console.log(res.status)
        if (res.status == 201) {

        }
      })
    },
    // newGAME: function () {
    //   this.game = false;
    //   this.socket.send(JSON.stringify({
    //     action: "NewGame",
    //     name:"Ross"
    //   }))
    // },
    discard: function(card){
      this.hand.splice(card.key, 1);
      this.socket.send(JSON.stringify({
        action: "Game-Play",
        adjective: "Discard",
        gameId: this.gameId,
        object: card
      }))
    },
    ShowCard: function (data) {
      this.socket.send(JSON.stringify({
        action: 'Submit-Card',
        gameId: this.gameId,
        card: data
      }))
    }

  },
  created: function () {
    let thisState = this;
    // var HOST = location.origin.replace(/^http/, 'ws');
    this.socket = new WebSocket("ws://localhost:9090");

    this.socket.onopen = function () {
      console.log("Were Ready");
    };

    this.socket.onmessage = function (event) {
      logMessages(event.data, thisState);
    };
  },
  components:{
    'hand': Hand,
    'card': Card
  }
};

var logMessages = function (e, app) {
  var data = JSON.parse(e);
  if(data.action == "newGame") {
    app.player = data.hand;
    app.gameId = data.gameID;
  } else if (data.action == "Play" && data.adjective == "Discarded") {
    app.board = data.board;
  } else if (data.action == "playedCard") {
    console.log("post Card Played");
    app.board = data.board;
    app.player = data.hand;
  }
};

</script>

<style>
body{
  margin: 0;
  height: 100vh;
}

.game{
  height: 100%;
  display: grid;
  grid-template-rows: 25% auto 45%;
  grid-row-gap: 1rem;
}

.hand{
height: 50%;
align-self: center;
}
</style>
