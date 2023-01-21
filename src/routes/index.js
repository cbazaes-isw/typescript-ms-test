const router = require('express').Router();

const auth = require('../middleware/auth');

const helloRoute = require('./hello');
const authRoute = require('./auth');

router.use('/hello', auth, helloRoute);
router.use('/auth', authRoute);

module.exports = router;