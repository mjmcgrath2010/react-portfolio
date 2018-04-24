const router = require('express').Router();
require('dotenv').config();

// Routes
router.use('/services', require('./micro-services/index'));
router.use('/db', require('./db/index'));

module.exports = router;
