const router = require('express').Router();
const controller = require('./projectController');

// lock down the right routes :)
router.param('id', controller.params);

router
  .route('/')
  .get(controller.get)
  .post(controller.post);

router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete);

module.exports = router;
