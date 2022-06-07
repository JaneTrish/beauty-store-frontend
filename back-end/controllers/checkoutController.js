const db = require('../db');
const { isEmail } = require('validator');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

// CHECKOUT
const placeOrder = async (req, res) => {
  const { userId } = req.user;
  const { id: cartId } = req.params;
  const { shipping_name, shipping_address, phone, email, paid } = req.body;

  if (!shipping_name || !shipping_address || !phone || !email) {
    throw new CustomError.BadRequestError(
      'Please, provide name, address, phone, email and payment'
    );
  }

  //validate email
  if (!isEmail(email)) {
    throw new CustomError.BadRequestError('Please, provide a valid email');
  }

  //Get cart total
  const cart = await db.query(
    'SELECT cart_total FROM cart WHERE cart_id = $1',
    [cartId]
  );

  if (cart.rowCount < 1) {
    throw new CustomError.NotFoundError('The cart was not found');
  }

  //CREATE NEW ORDER

  const newOrder = await db.query(
    'INSERT INTO orders (user_id, shipping_name, shipping_address, phone, email, created_at, paid, total) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [
      userId,
      shipping_name,
      shipping_address,
      phone,
      email,
      new Date(Date.now()),
      paid,
      cart.rows[0].cart_total,
    ]
  );

  //Get All Items From the Cart

  const { rows: cartItems } = await db.query(
    'SELECT * FROM cart_items WHERE cart_id = $1',
    [cartId]
  );

  //console.log(cartItems);

  //Copy cart items into order_items table

  cartItems.forEach(async (item) => {
    await db.query(
      'INSERT INTO order_items (order_id, product_id, item_name, price, quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        newOrder.rows[0].id,
        item.product_id,
        item.cart_item_name,
        item.price,
        item.quantity,
      ]
    );
  });

  //delete cart after placing an order

  if (newOrder.rows[0].id) {
    await db.query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);
    await db.query('DELETE FROM cart WHERE cart_id = $1', [cartId]);
  } else {
    throw new CustomError('Sorry something went wrong');
  }

  res
    .status(StatusCodes.CREATED)
    .json({ message: 'success', orderId: newOrder.rows[0].id });
};

module.exports = placeOrder;
