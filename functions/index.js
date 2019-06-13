require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./api/helpers/jwt');
const errorHandler = require('./api/helpers/error-handler');
const functions = require("firebase-functions");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./api/users/users.controller'));
app.use('/images', require('./api/images/images.controller'));

// global error handler
app.use(errorHandler);

const converter = functions.https.onRequest((req, res) => {
  if (!req.path) {
    req.url = `/${req.url}` // prepend '/' to keep query params if any
  }
  return app(req, res)
});

// Configure Firebase Server
module.exports = {
  converter
};
