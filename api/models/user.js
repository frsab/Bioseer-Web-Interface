const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    first_name: String,
    last_name: String,
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

const User = mongoose.model('User', testSchema);

module.exports = User;
