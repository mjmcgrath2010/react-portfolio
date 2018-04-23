const router = require('express').Router();
const db = require('mongoose');

db.connect('mongodb://localhost/portfolio');
require('./middleware/dbMiddleware')(router);

// Routes
router.use('/projects', require('./projects/projectRoutes'));

module.exports = router;
