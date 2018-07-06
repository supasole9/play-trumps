const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const Cards = require("../gameLogic/cards.js");

const userModel = require('./models/userModel');
const WebSocket = require('ws');
const Check = require("../gameLogic/gamePlay")

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static("/"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(session({secret: 'deezBIGnuts', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy(
  {usernameField: 'email'},
  function (email, password, done) {
  userModel.User.findOne({ email:email }).then(function (user) {
    if (!user) {
      console.log("user not found");
      return done(null, false)
    }
    user.verifyPassword(password, function (valid) {
      if (valid) {
        return done(null, user);
      } else {
        console.log("bad password");
        return done(null, false);
      }
    });
  }, function (err) {
    console.log("some error");
    return done(err)
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user._id)
});

passport.deserializeUser(function(id, done) {
  userModel.User.findOne({ _id:id }).then(function(user) {
    done(null, user);
  }, function (err) {
    done(err);
  });
});

// app.post("/session", passport.authenticate("local"), function (req ,res) {
//   console.log(req)
//   res.sendStatus(201);
// });

app.post("/session", function (req, res) {
  let email = req.body.email
  userModel.User.findOne({ email:email }).then(function (user) {
    if (!user) {
      res.status(401).send("Email not found");
    }
    user.verifyPassword(req.body.password, function (valid) {
      if (valid) {
        res.status(201).json(user);
      } else {
        console.log("bad password");
      }
    });
  });
});

// app.get("/me", function(req, res) {
//   if (req.user) {
//     res.json(req.user.simpleUser())
//   } else {
//     res.sendStatus(401);
//   }
// });

app.get("/me/:id", function(req, res) {
  userModel.User.findOne({ _id:req.params.id }).then(function (user) {
    if (!user) {
      return res.status(401).send('ID not found');
    }
    res.status(200).json(user);
  }, function (err) {
    if (err.errors) {
      var messages = {}
      for (var e in err.errors) {
        messages[e] = err.errors[e].message;
      }
      res.status(422).json(messages);
    }
    else {
      console.log("Post /User - Internal Error")
      res.sendStatus(500)
    }
  });
});

app.post("/users", function(req, res) {
  var user = new userModel.User ({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    age:  req.body.age
  });
  user.setPassword(req.body.password, function () {
    user.save().then(function () {
      console.log("saving user");
      res.status(201).json(user);
    }, function (err) {
      if (err.errors) {
        var messages = {}
        for (var e in err.errors) {
          messages[e] = err.errors[e].message;
        }
        res.status(422).json(messages);
      }
      else {
        console.log("Post /User - Internal Error")
        res.sendStatus(500)
      }
    });
  });
});

app.post("/simpleUsers", function (req, res) {
  console.log("Simple User Created");
});

app.get("/users", function (req, res) {
  console.log("Listing Users");
});

app.get("/games", function (req, res) {
  console.log("Listing Games");
});

app.get("/games/:gameId", function (req, res) {
  console.log("Retrieve game");
});

app.post("/games", function (req, res) {
  let game = new Cards.deck();
  res.status(201).json({game});
});

app.put("/games/:gameId", function (req, res) {
  console.log("Editing Game");
});

app.delete("/games/:gameId", function (req, res) {
  console.log("Deleting game");
});

app.delete("/me", function (req, res) {
  console.log("Deleting session data");
});


var server = app.listen(9090, function () {
  console.log("server started");
});

const wss = new WebSocket.Server({ 'server': server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function(ws) {
    ws.on('message', function (data) {
      let json = JSON.parse(data);
      Check.check(json, ws)
    })
});
