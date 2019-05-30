const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoClient = require('mongodb').MongoClient,
  passport = require('passport'),
  session = require('express-session'),
  RedisStore = require('connect-redis')(session)

mongoClient.connect("mongodb://bioseer:2qVnkQCMo3GRoTIWIQJ7gLC0TPk0nTHLnyLIjRQ5W3t1fLA6b3bCgD806ylsRBl92SfpJ2dLIiu3QKAQOYuaWQ%3D%3D@bioseer.documents.azure.com:10255/?ssl=true", function (err, client) {
  client.close();
});
const app = express();
app.use(bodyParser.json());
app.use(cors());


let port = process.env.PORT || 4000;

const server = app.listen(function(){
  console.log('Listening on port ' + port);
});
