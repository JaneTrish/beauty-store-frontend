const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');
const {
  createCart,
  getAllCartItems,
  addItemToCart,
  updateCartItem,
  deleteCartItem,
  deleteCart,
} = require('../controllers/cartController');
const placeOrder = require('../controllers/checkoutController');

router.route('/').post(authenticateUser, createCart);

router
  .route('/:id')
  .get(authenticateUser, getAllCartItems)
  .delete(authenticateUser, deleteCart);

router
  .route('/:id/item')
  .post(authenticateUser, addItemToCart)
  .put(authenticateUser, updateCartItem)
  .delete(authenticateUser, deleteCartItem);

router.route('/:id/checkout').post(authenticateUser, placeOrder);

module.exports = router;
