const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const SensorUpload = db.SensorUpload;

module.exports = {
  upload,
  update
};


async function getAll() {
  return await SensorUpload.find();
}

async function getById(id) {
  return await SensorUpload.findById(id);
}

async function upload(sensorParam) {
  if (await SensorUpload.findOne({ sensorId: sensorParam.sensorId })) {
    throw 'Sensor "' + sensorParam.sensorId + '" is already taken, use a PUT'
  }
}

async function update(id, sensorParam) {
  const sensor = await SensorUpload.findById(id);

  // validate
  if (!sensor) throw 'Sensor not found';

  Object.assign(sensor, sensorParam);

  await sensor.save();
}

async function _delete(id) {
  await SensorUpload.findByIdAndRemove(id);
}
