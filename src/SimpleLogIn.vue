<template>
  <div id="app">
    <div class="heading">
      <h1>Trumps</h1>
      The game created in <br> Kahuku High School
    </div>
    Enter a username: <br>
    <input type="text" v-model="userName"> <br>
    <button v-on:click="submitName">submit</button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      userName: ""
    }
  },
  methods: {
    submitName: function () {
      if (this.userName.length == 0) {
        console.log("empty")
      } else {
        let newUser = "username=" + this.userName;
        fetch('http://localhost:9090/users', {
          body: newUser,
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function (res){
          if (res.status == 201) {
            // send to new dashboard page
          } else {
            // error, keep on this page
          }
        });
      }
    }
  }
}
</script>

<style>
.heading{
  margin-bottom: 15px;
}

h2{
  margin: 0;
}

</style>
