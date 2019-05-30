const User = require('../models/user');

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

function postUser(req,res) {
  const originalUser = { uid: req.body.uid };
  const user = new User(originalUser);
  user.save(error => {
    if (checkServerError(res, error)) return;
    res.status(201).json(user);
    console.log('Hero created successfully!');
  })
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

module.exports = {
  getUsers,
  postUser
};
