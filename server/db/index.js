const router = require('express').Router();

require('mongoose').connect('mongodb://localhost/portfolio');
require('./middleware/dbMiddleware')(router);

// Routes
router.use('/projects', require('./projects/projectRoutes'));

module.exports = router;
