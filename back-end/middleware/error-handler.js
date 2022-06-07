const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    //set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, please try again later',
  };
  if (err.message.startsWith('invalid input syntax for type uuid')) {
    customError.msg = 'Invalid id syntax';
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (
    err.message.startsWith('duplicate key value violates unique constraint') ||
    err.message.startsWith('null value in column')
  ) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
