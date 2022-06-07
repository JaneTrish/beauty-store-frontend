const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const checkPassword = async (candidatePassword, userPassword) => {
  const isPasswordCorrect = await bcrypt.compare(
    candidatePassword,
    userPassword
  );
  return isPasswordCorrect;
};

module.exports = { hashPassword, checkPassword };
