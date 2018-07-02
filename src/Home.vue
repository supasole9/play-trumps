<template>
  <div id="app" class="wrapper">
    <h1>SUIPI</h1>
    <app-error v-if="error"></app-error>
    <div v-if="loginView">
      <p v-if="signinErrors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in signinErrors" v-bind:key="error.id">{{ error }}</li>
        </ul>
      </p>
      <input type="text" v-model="email"> <br>
      <input type="text" v-model="password"> <br>
      <button v-on:click="login">Login</button>
      <p v-on:click="switchView">Not a member? Create an account</p>
    </div>
    <div v-else>
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
        </ul>
      </p>
      <input type="text" v-model="fname" placeholder="Enter First Name"> <br>
      <input type="text" v-model="lname" placeholder="Enter Last Name"> <br>
      <input type="text" v-model="newEmail" placeholder="Enter Email"> <br>
      <input type="text" v-model="newPassword" placeholder="Enter Password"> <br>
      <input type="text" v-model="confirmPassword" placeholder="Confirm Password"> <br>
      <input type="number" v-model="age" placeholder="Enter Age"> <br>
      <button v-on:click="create">Create Account</button>
      <p v-on:click="switchView">Already have an account? Log in</p>
    </div>
  </div>
</template>

<script>
import LoginError from "./Error.vue";

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
      email: "",
      password: "",
      error: false,
      socket: null,
      newEmail: "",
      newPassword: "",
      confirmPassword: "",
      fname: "",
      lname: "",
      age: null,
      loginView: true,
      errors: [],
      signinErrors: [],
      error: false
    }
  },
  methods: {
    login: function () {
      let session = "email=" + this.email + "&password=" + this.password;
      let thisState = this;
      fetch("http://localhost:9090/session", {
        body: session,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function(res){
        console.log(res)
        if (res.status == 201) {
          thisState.$router.push("/dashboard");
        } else {
          thisState.signinErrors = [];
          thisState.signinErrors.push("Password and/or Email is incorrect. Please try again.");
        }
      })
    },
    create: function () {
      let newUser = "email=" + this.newEmail + "&password=" + this.newPassword + "&fname=" + this.fname + "&lname=" + this.lname + "&age=" + this.age;
      let thisState = this;

      if (this.passwordMatch() && this.checkForm()) {
        fetch("http://localhost:9090/users", {
          body: newUser,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function(res){
          console.log(res)
          if (res.status == 201) {
            thisState.$router.push("/dashboard");
          } else {
            thisState.error = true;
          }
        })
      }
    },
    passwordMatch: function () {
      if (this.newPassword === this.confirmPassword) return true;
      this.errors = [];
      if (this.newPassword != this.confimPassword) this.errors.push("Passwords do not match");
    },
    checkForm:function() {
      if(this.fname && this.age && this.lname && this.passwordMatch()) return true;
      this.errors = [];
      if(!this.fname) this.errors.push("First name required.");
      if(!this.lname) this.errors.push("Last name required.");
      if(!this.email) this.errors.push("Email required.");
      if(!this.age) this.errors.push("Age required.");
    },
    switchView: function () {
      this.loginView = !this.loginView;
    }
  },
  created: function () {
    console.log('Home Page');

    fetchUser().then(function(user) {
      if (user) {
        this.user = user;
      } else {
        console.log("no user")
      }
    });
  },
  components: {
    'app-error': LoginError
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
  margin-top: 60px;
}
</style>
