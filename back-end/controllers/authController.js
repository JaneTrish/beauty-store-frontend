const { StatusCodes } = require('http-status-codes');
const { isEmail } = require('validator');
const { v4 } = require('uuid');
const CustomError = require('../errors');
const db = require('../db');
const {
  createToken,
  createTokenUser,
  hashPassword,
  checkPassword,
} = require('../utils');

//REGISTER USER

const register = async (req, res) => {
  const { user_name, email, password } = req.body;

  if (!user_name || !email || !password) {
    throw new CustomError.BadRequestError(
      'Please provide name, email and password'
    );
  }

  //validate email
  if (!isEmail(email)) {
    throw new CustomError.BadRequestError('Please, provide a valid email');
  }

  //check if email already exists in the database
  const emailExists = await db.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  if (emailExists.rowCount > 0) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  //encrypt password
  const hashedPassword = await hashPassword(password);

  //save a new user in the database
  const id = v4();
  const role = 'customer';
  const { rows: newUser } = await db.query(
    'INSERT INTO users (id, user_name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [id, user_name, email, hashedPassword, role]
  );

  const tokenUser = createTokenUser(newUser[0]);

  const token = createToken(tokenUser);

  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
};

//LOGIN USER

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }

  //check password
  const { rows: user } = await db.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );

  if (user.length < 1) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }

  const userPassword = user[0].password;
  const isPasswordCorrect = await checkPassword(password, userPassword);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }

  const tokenUser = createTokenUser(user[0]);

  const token = createToken(tokenUser);

  res.status(StatusCodes.OK).json({ user: tokenUser, token });
};

//LOGOUT USER

const logout = (req, res) => {
  res.status(StatusCodes.OK).send({ msg: 'User logged out' });
};

module.exports = {
  register,
  login,
  logout,
};
