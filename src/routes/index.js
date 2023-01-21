const router = require('express').Router();

const helloRoute = require('./hello');
const authRoute = require('./auth');

router.use('/hello', helloRoute);
router.use('/auth', authRoute);

module.exports = router;