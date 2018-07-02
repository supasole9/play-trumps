<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <button v-on:click="newGame">Start New Game</button>
  </div>
</template>

<script>
import Hand from "./hand.vue";

var fetchUser = function () {
     return fetch('http://localhost:9090/me', {
       method: "GET"
     }).then(function (response) {
          return response.json();
     });
};

export default {
  name: 'app',
  data () {
    return {
      msg: 'DashBoard Page'
    }
  },
  methods: {
    newGame: function () {
      this.$router.push("/newgame");
    }
  },
  components: {

  },
  created: function () {
    let thisState = this;

    // fetch('http://localhost:9090/me', {
    //   method: "GET"
    // }).then(function (res) {
    //      if (res.status != 200) {
    //        thisState.$router.push("/");
    //      }
    // });

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
