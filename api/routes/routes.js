const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');

router.get('/user', (req, res) => {
  userService.getUsers(req, res);
  // res.status(200).send([
  //   {"id": 10, "name": "Starlord", "saying": "oh yeah"}
  // ])
});

router.post('/user', (req, res) => {
  userService.postUser(req, res);
});

module.exports=router;
