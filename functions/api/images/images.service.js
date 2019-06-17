const express = require('express');
const router = express.Router();
const imagesService = require('./images.service');

router.post('/upload', uploadImage);

module.exports = router;

function uploadImage(req, res, next) {
  console.log(req)
}
