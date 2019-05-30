const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/routes');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');
const root = './';
const port = process.env.PORT || '3000';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(root, 'dist/Bioseer-Web-Interface')));
app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile('../dist/Bioseer-Web-Interface/index.html', {root});
});

// Passport init
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }
      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid password'});
        }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

app.listen(port, () => console.log(`API running on localhost:${port}`));
