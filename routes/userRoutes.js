const express = require('express');
const router = express.Router();
const uc = require(`${__dirname}/../controller/userController`);

router.route('/').get(uc.getAllUsers).post(uc.createUser);
router
  .route('/:id')
  .get(uc.getUserById)
  .patch(uc.updateUser)
  .delete(uc.deleteUser);

module.exports = router;
