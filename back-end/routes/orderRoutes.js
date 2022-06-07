const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const {
  getAllOrders,
  getSingleOrder,
} = require('../controllers/orderController');

router.route('/').get(authenticateUser, getAllOrders);

router.route('/:id').get(authenticateUser, getSingleOrder);

module.exports = router;
