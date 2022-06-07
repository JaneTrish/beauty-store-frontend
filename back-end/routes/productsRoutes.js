const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productsController');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

router
  .route('/')
  .get(getAllProducts)
  .post(
    authenticateUser,
    authorizePermissions('admin', 'owner'),
    createProduct
  );
router
  .route('/:id')
  .get(getSingleProduct)
  .put(authenticateUser, authorizePermissions('admin', 'owner'), updateProduct)
  .delete(
    authenticateUser,
    authorizePermissions('admin', 'owner'),
    deleteProduct
  );

module.exports = router;
