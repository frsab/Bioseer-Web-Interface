const functions = require('firebase-functions');

module.exports = {
  accountName: 'bioseer',
  databaseName: 'admin',
  key: functions.config().bioseer.key,
  port: functions.config().bioseer.port
};
