require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const path = require('path');
const favicon = require('serve-favicon');

const root = './';

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// Favicon
app.use(favicon(path.join(__dirname, './', 'favicon.ico')));

// api routes
app.use(express.static(path.join(root, 'dist/Bioseer-Web-Interface')));
app.use('/users', require('./users/users.controller'));
app.get('*', (req, res) => {
  res.sendFile('../dist/Bioseer-Web-Interface/index.html', {root});
});

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
