const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const db = require('../db');
const {
  hashPassword,
  checkPassword,
  createTokenUser,
  createToken,
  checkPermissions,
} = require('../utils');

//GET ALL USERS (admin route)
const getAllUsers = async (req, res) => {
  console.log(req.user);
  const { rows: users } = await db.query(
    'SELECT id, user_name, email, role FROM users ORDER BY user_name'
  );

  res.status(StatusCodes.OK).json({ users });
};

//GET SINGLE USER (admin route)
const getSingleUser = async (req, res) => {
  const user = await db.query(
    'SELECT id, user_name, email, role FROM users WHERE id = $1',
    [req.params.id]
  );

  if (user.rowCount < 1) {
    throw new CustomError.NotFoundError(`No user with id ${req.params.id}`);
  }

  checkPermissions(req.user, user.rows[0].id);

  res.status(StatusCodes.OK).json({ user: user.rows[0] });
};

//SHOW CURRENT USER
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

//UPDATE USER
const updateUser = async (req, res) => {
  const { user_name, email } = req.body;
  if (!user_name || !email) {
    throw new CustomError.BadRequestError('Please provide name and email');
  }

  await db.query('UPDATE users SET user_name = $1, email = $2 WHERE id = $3', [
    user_name,
    email,
    req.user.userId,
  ]);

  const { rows: user } = await db.query(
    'SELECT id, user_name, email, role FROM users WHERE id = $1',
    [req.user.userId]
  );

  const tokenUser = createTokenUser(user[0]);

  const token = createToken(tokenUser);

  res.status(StatusCodes.OK).json({ user: tokenUser, token });
};

//UPDATE USER PASSWORD
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError(
      'Please provide old and new password'
    );
  }
  const { rows: user } = await db.query('SELECT * FROM users WHERE id = $1', [
    req.user.userId,
  ]);

  //check if old password correct
  const userPassword = user[0].password;
  const isPasswordCorrect = await checkPassword(oldPassword, userPassword);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }
  //encrypt new password
  const hashedPassword = await hashPassword(newPassword);

  await db.query('UPDATE users SET password = $1 WHERE id = $2', [
    hashedPassword,
    user[0].id,
  ]);

  res.status(StatusCodes.OK).json({ msg: 'Success! Password updated' });
};

//DELETE USER
const deleteUser = async (req, res) => {
  const { userId } = req.user;
  console.log(req.userId);
  const userToDelete = await db.query('SELECT * FROM users WHERE id = $1', [
    userId,
  ]);

  if (userToDelete.rowCount < 1) {
    throw new CustomError.NotFoundError(`No user with id ${userId}`);
  }

  //find all user's orders
  const { rows: orders } = await db.query(
    'SELECT * FROM orders WHERE user_id = $1',
    [userId]
  );

  //delete from order_items where order_id refers to user's order
  if (orders.length > 0) {
    const orderIds = orders.map((order) => order.id);
    orderIds.forEach(async (item) => {
      await db.query('DELETE FROM order_items WHERE order_id = $1', [item]);
    });
  }

  await db.query('DELETE FROM cart WHERE user_id = $1', [userId]);
  await db.query('DELETE FROM orders WHERE user_id = $1', [userId]);
  await db.query('DELETE FROM users WHERE id = $1', [userId]);
  res.status(StatusCodes.NO_CONTENT).send(`User deleted`);
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  deleteUser,
};
