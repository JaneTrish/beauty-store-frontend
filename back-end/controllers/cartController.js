const db = require('../db');
const { v4 } = require('uuid');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

//CREATE CART
const createCart = async (req, res) => {
  const { userId } = req.user;
  console.log(req.user);

  //check if a user already has a cart
  const cart = await db.query('SELECT * FROM cart WHERE user_id = $1', [
    userId,
  ]);

  //if no - create a new cart
  if (cart.rowCount < 1) {
    const cartId = v4();
    const newCart = await db.query(
      'INSERT INTO cart (cart_id, user_id, cart_total, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
      [cartId, userId, req.body.cart_total, new Date(Date.now())]
    );

    return res.status(StatusCodes.CREATED).json(newCart.rows[0]);
  }

  //if there is a cart - get that cart's id

  res.status(StatusCodes.OK).json({ cart_id: cart.rows[0].cart_id });
};

//GET ALL ITEMS FROM THE CART
const getAllCartItems = async (req, res) => {
  const { rows: cart } = await db.query(
    'SELECT * FROM cart_items WHERE cart_id = $1',
    [req.params.id]
  );

  res.status(StatusCodes.OK).json({ cart });
};

//ADD ITEM TO THE CART
const addItemToCart = async (req, res) => {
  const { product_id, cart_item_name, price, quantity } = req.body;
  if (!product_id || !cart_item_name || !price || !quantity) {
    throw new CustomError.BadRequestError(
      'Please, provide product id, name, price and quantity'
    );
  }

  //check if item already in the cart
  const cart = await db.query(
    'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2',
    [req.params.id, product_id]
  );

  //if it doesn't exist, create item
  if (cart.rowCount < 1) {
    const newItem = await db.query(
      'INSERT INTO cart_items (cart_id, product_id, cart_item_name, price, quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.params.id, product_id, cart_item_name, price, quantity]
    );

    return res.status(StatusCodes.CREATED).json(newItem.rows[0]);
  }
  //if it already exists, update quantity
  else {
    const updatedCartItem = await db.query(
      'UPDATE cart_items SET quantity = $1 WHERE product_id=$2 AND cart_id=$3 RETURNING * ',
      [quantity, product_id, req.params.id]
    );

    return res.status(StatusCodes.OK).json(updatedCartItem.rows[0]);
  }
};

//UPDATE CART ITEM
const updateCartItem = async (req, res) => {
  const { product_id, quantity } = req.body;
  if (!product_id || !quantity) {
    throw new CustomError.BadRequestError(
      'Please provide product_id and quantity'
    );
  }

  const updatedCartItem = await db.query(
    'UPDATE cart_items SET quantity = $1 WHERE product_id=$2 AND cart_id=$3 RETURNING * ',
    [quantity, product_id, req.params.id]
  );

  res.status(StatusCodes.OK).json(updatedCartItem.rows[0]);
};

//DELETE CART

const deleteCart = async (req, res) => {
  await db.query('DELETE FROM cart_items WHERE cart_id = $1', [req.params.id]);
  await db.query('DELETE FROM cart WHERE cart_id = $1', [req.params.id]);

  if (!req.params.id) {
    throw new CustomError.BadRequestError('Please provide cart_id');
  }

  res
    .status(StatusCodes.NO_CONTENT)
    .json({ msg: `No cart with id ${req.params.id}` });
};

//DELETE ITEM FROM THE CART
const deleteCartItem = async (req, res) => {
  const { product_id } = req.body;

  if (!product_id) {
    throw new CustomError.BadRequestError('Please provide product_id');
  }

  await db.query('DELETE FROM cart_items WHERE product_id = $1', [product_id]);

  //DELETE CART IF EMPTY
  const cart = await db.query('SELECT * FROM cart_items WHERE cart_id = $1', [
    req.params.id,
  ]);

  if (cart.rowCount < 1) {
    await db.query('DELETE FROM cart WHERE cart_id = $1', [req.params.id]);
  }

  res.status(StatusCodes.OK).json({ msg: `No product with id ${product_id}` });
};

module.exports = {
  createCart,
  getAllCartItems,
  addItemToCart,
  updateCartItem,
  deleteCartItem,
  deleteCart,
};
