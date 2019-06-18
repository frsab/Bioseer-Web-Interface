const router = express.Router();
const sensorUploadService= require('./sensorupload.service');
const jwt = require('../helpers/jwt');

// routes
// Note if testing routes with postman, be sure to put key into Authorization tab
router.post('/upload', upload);
router.put('/upload/:id', jwt(), updateSensor)

module.exports = router;

function upload(req, res, next) {
  sensorUploadService
}

function updateSensor(req, res, next) {

}
