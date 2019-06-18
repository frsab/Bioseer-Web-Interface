const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  sensorId: { type: String, unique: true, required: true},
  sensorName: { type: String, unique: true, required: true},
  ownerId: { type: String, unique: true, required: true},
  currentLocation: {
    lat: { type: String },
    long: { type: String }
  }, // Latitutde and Longitude
  zoneID: { type: String, unique: true, required: true},
  status: { type: String, unique: true, required: true},
  imageData: [
    { // Images in broadcast
      rawImage: { type: String, unique: true, required: true},
      meta: {
        algae: { type: Number, unique: true, required: true},
        rocks: { type: Number, unique: true, required: true},
        soil: { type: Number, unique: true, required: true},
        nonaquaticplant: { type: Number, unique: true, required: true},
        benthicSpecies: { type: Number, unique: true, required: true},
        humanPollution: { type: Number, unique: true, required: true},
        fish: { type: Number, unique: true, required: true}
      },
    timeStamp: { type: String },
    }
  ]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('SensorUpload', schema);
