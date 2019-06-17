require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./api/helpers/jwt');
const errorHandler = require('./api/helpers/error-handler');
const functions = require("firebase-functions");
const admin = require('firebase-admin');
const fileUpload = require('express-fileupload');

admin.initializeApp();
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/users', require('./api/users/users.controller'));
app.use('/images', require('./api/images/images.controller'));

app.get('/test', (req, res) => {
  console.log(req.auth);
  res.send('Authorized')
});

// global error handler
app.use(errorHandler);

const api = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`; // Prepend '/' to keep query params if any
  }

  return app(request, response);
});

// Configure Firebase Server
module.exports = {
  api
};
