const router = require('express').Router();

// Routes
router.use('/services', require('./micro-services/index'));
// router.use('/db', require('./db/index'));

module.exports = router;
