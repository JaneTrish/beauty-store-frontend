const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  deleteUser,
} = require('../controllers/userController');

router
  .route('/')
  .get(authenticateUser, authorizePermissions('admin', 'owner'), getAllUsers);
//"/showMe", "updateUser", "updateUserPassword" and "deleteUser" routes should be above "/:id" otherwise they will be treated as an id parameter
router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').put(authenticateUser, updateUser);
router.route('/updateUserPassword').put(authenticateUser, updateUserPassword);
router.route('/deleteUser').delete(authenticateUser, deleteUser);

router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;
