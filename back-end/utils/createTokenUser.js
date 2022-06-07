const createTokenUser = (user) => {
  return {
    userId: user.id,
    name: user.user_name,
    role: user.role,
  };
};

module.exports = createTokenUser;
