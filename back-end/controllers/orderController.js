const db = require('../db');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

//GET ORDERS
const getAllOrders = async (req, res) => {
  const orders = await db.query('SELECT * FROM orders WHERE user_id = $1', [
    req.user.userId,
  ]);

  res.status(StatusCodes.OK).json({ orders: orders.rows });
};

//GET SINGLE ORDER DETAILS
const getSingleOrder = async (req, res) => {
  const orderItems = await db.query(
    'SELECT * FROM order_items WHERE order_id = $1',
    [req.params.id]
  );
  if (orderItems.rowCount < 1) {
    throw new CustomError.NotFoundError(`No order with id ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json({ orderItems: orderItems.rows });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
};
