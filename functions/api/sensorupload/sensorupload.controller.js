const router = express.Router();
const sensorupload= require('./sensorupload.service');
const jwt = require('../helpers/jwt');

// routes
// Note if testing routes with postman, be sure to put key into Authorization tab
router.post('/upload', upload);
