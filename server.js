require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./api/helpers/jwt');
const errorHandler = require('./api/helpers/error-handler');
const path = require('path');
const favicon = require('serve-favicon');
const http = require('http');

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
app.use(favicon(path.join(__dirname, './src/', 'favicon.ico')));

// api routes
app.use(express.static('dist/Bioseer-Web-Interface'));
app.use('/users', require('./api/users/users.controller'));
app.use('/images', require('./api/images/images.controller'))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/Bioseer-Web-Interface/index.html'));
});

// global error handler
app.use(errorHandler);

// start server
const server = http.createServer(app);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

server.listen(port, () => {
  console.log('Server listening on port ' + port);
});


// const server = app.listen(port, function () {
//   console.log('Server listening on port ' + port);
// });
