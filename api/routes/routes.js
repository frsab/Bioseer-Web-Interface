const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const passport = require('passport');


router.get('/user', (req, res) => {
  userService.getUsers(req, res);
  // res.status(200).send([
  //   {"id": 10, "name": "Starlord", "saying": "oh yeah"}
  // ])
});

router.post('/register', (req, res) => {
  userService.registerUser(req, res)
});

router.post('/login',
  passport.authenticate('local'),
    (req, res) => {
      res.send(req.user);
    }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.send(null)
});

module.exports=router;

