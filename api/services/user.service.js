const User = require('../models/user');
const bcrypt = require('bcryptjs');

require('../mongo').connect();

function getUsers(req, res) {
  const docquery = User.find({});
  docquery
    .exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).send(error);
    })
}

function registerUser(req,res) {
  let newUser = new User({
    uid: req.body.uid,
    email: req.body.email,
    password: req.body.password
  });
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      newUser.password = hash;
      newUser.markModified('password');
      newUser.save(() => {
        if (err) throw err;
        res.send(newUser).end()
      });
    })
  })
  // const user = new User(originalUser);
  // user.save(error => {
  //   if (checkServerError(res, error)) return;
  //   res.status(201).json(user);
  //   console.log('Hero created successfully!');
  // })
}

function loginUser(req, res) {
  const newUser = {
    uid: req.body.uid,
    email: req.body.email,
    password: req.body.password
  };
  // User.createUser(newUser, (err, user) => {
  //   if (err) throw err;
  //   res.send(user).end()
  // })
}



function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}



module.exports = {
  getUsers,
  loginUser,
  registerUser,
  checkServerError
};
