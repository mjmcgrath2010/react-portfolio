const router = require('express').Router();
require('mongoose').connect('mongodb://localhost/portfolio');

// setup the app db middleware
require('./middleware/dbMiddleware')(router);

router.use('/projects', require('./projects/projectRoutes'));

module.exports = router;
