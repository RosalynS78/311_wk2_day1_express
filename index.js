const express = require("express");
const app = express();
// Part 2. Body-parser module
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

const {
  users
} = require("./state");


/* BEGIN - create routes here */

// Part 1: Basic routes

// GET /users
app.get("/users", function (req, res) {
  let input = res.json(users);
});

// GET /users/1
// gets single users with userID 
app.get("/users/:userId", function (req, res) {
  let userId = parseInt(req.params.userId);
  let user = users.find(user => user._id === userId);
  res.send(user);
});

// Post /users
app.post("/users", function (req, res) {
  let userPlus = {
    "id": 6,
    "name": "Spencer Scheffel",
    "occupation": "Doggo",
    "avatar": "https://www.cartoonizemypet.com/s/6194097"
  };
  users.push(userPlus);
  res.json(users);
})

// Put /users/1
app.put("/users/1", function (req, res) {
  let userOne = users[0]
  userOne.name = "Officer Rabbit"
  userOne.occupation = "Super Troopers"
  res.json(userOne);
})

// Delete /users/1
app.delete('/users/1', function (req, res) {
  users.splice(0,1)
  res.send("Deleted")
  return res.json(users)
})
// Part 2. Body-parser module

// Give your server the ability to handle a POST request with a path "/users"
// Assign an _id property to the user object that is a number that increments by 1 each time.

app.post('/users', function (req, res) {
  let userPlusOne = req.body
  console.log(userPlusOne)
  userPlusOne._id = counter + 1
  users.push(userPlusOne)
  return res.json(users)
})

// Part 3. Use path variables

// GET /users/1 => GET /users/:userId

app.get('/users/:userId', function (req, res) {
  let userId = req.params.userId -1
  return res.json(users[userId])
})

//  PUT /users/1 => PUT /users/:userId

app.put('users/:userId', function (req, res) {
  let userId = req.params.userId -1
  users[userId].name = "Jane Doe"
  return res.json(users[userId])
})

// DELETE /users/1 => DELETE /users/:userId

app.delete('/users/:userId', function (req, res) {
  let userId = req.params.userId -1
  users[userId].isActive = false
  res.send("Deleted")
  return res.json(users)
})

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));