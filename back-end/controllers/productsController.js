const db = require('../db');
const { v4 } = require('uuid');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

//CREATE PRODUCT
const createProduct = async (req, res) => {
  const { product_name, price, description, image, stock, category, rating } =
    req.body;

  const id = v4();

  const newProduct = await db.query(
    'INSERT INTO products (id, product_name, price, description, image, stock, category, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [id, product_name, price, description, image, stock, category, rating]
  );

  res.status(StatusCodes.CREATED).json(newProduct.rows[0]);
};

//GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  const products = await db.query(
    'SELECT * FROM products ORDER BY product_name'
  );
  res.status(StatusCodes.OK).json({ products: products.rows });
};

//GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await db.query('SELECT * FROM products WHERE id = $1', [id]);

  if (product.rowCount < 1) {
    throw new CustomError.NotFoundError(`No product with id ${id}`);
  }

  res.status(StatusCodes.OK).json(product.rows[0]);
};

//UPDATE PRODUCT
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { product_name, price, description, image, stock, category, rating } =
    req.body;

  if (
    !product_name ||
    !price ||
    !description ||
    !image ||
    !stock ||
    !category ||
    !rating
  ) {
    throw new CustomError.BadRequestError({
      msg: 'Please, provide product name, price, description, image, stock, category and rating',
    });
  }

  //check if product exists
  const product = await db.query('SELECT * FROM products WHERE id = $1', [id]);
  if (product.rowCount < 1) {
    throw new CustomError.NotFoundError(`No product with id ${id}`);
  }

  //update product
  const updatedProduct = await db.query(
    'UPDATE products SET product_name = $1, price = $2, description = $3, image = $4, stock = $5, category = $6, rating = $7 WHERE id=$8 RETURNING * ',
    [product_name, price, description, image, stock, category, rating, id]
  );
  res.status(StatusCodes.OK).json(updatedProduct.rows[0]);
};

//DELETE PRODUCT
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const productToDelete = await db.query(
    'SELECT * FROM products WHERE id = $1',
    [id]
  );

  if (productToDelete.rowCount < 1) {
    throw new CustomError.NotFoundError(`No product with id ${id}`);
  }

  await db.query('DELETE FROM products WHERE id = $1', [id]);

  res.status(StatusCodes.OK).send(`Product deleted`);
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
