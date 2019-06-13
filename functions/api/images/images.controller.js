const express = require('express');
const router = express.Router();
const userService = require('./images.service');

// routes
// Note if testing routes with postman, be sure to put key into Authorization tab
router.post('/upload', uploadImage);

module.exports = router;

function uploadImage(req, res, next) {
  userService.upload(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}
