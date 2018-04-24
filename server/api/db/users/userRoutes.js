const router = require('express').Router();
// const logger = require('../utils/logger');
const controller = require('./userController');
const auth = require('../auth/auth');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

// setup boilerplate route jsut to satisfy a request
// for building
router.param('id', controller.params);
router.get('/me', checkUser, controller.me);

router
  .route('/')
  .get(checkUser, controller.get)
  .post(auth.checkMasterToken, controller.post);

router
  .route('/:id')
  .get(checkUser, controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete);

module.exports = router;
