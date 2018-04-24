const router = require('express').Router();
const config = require('./config/config');
const logger = require('./utils/logger');
const auth = require('./auth/routes');
const projectRoutes = require('./projects/projectRoutes');

require('mongoose').connect(config.db.url);
require('./middleware/dbMiddleware')(router);

// Routes
router.use('/auth', auth);
router.use('/projects', projectRoutes);

// Error Handling
router.use((err, req, res) => {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  logger.error(err.stack);
  res.status(500).send('Oops');
});

module.exports = router;
