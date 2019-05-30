const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      unique: true
    },
    first_name: String,
    last_name: String,
    password: {
      type: String,
    },
    email: String,
    sensors: [
      {
        sensorID: String,
        sensorName: String
      }
    ],
    localZones: [String]
  }
);

const testSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true
    }
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

// module.exports.createUser = (newUser, callback) => {
//   bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash(newUser.password, salt, function (err, hash) {
//       newUser.password = hash;
//       newUser.save(callback);
//     })
//   })
//
// };

module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err;
    callback(null, isMatch);
  });
};
