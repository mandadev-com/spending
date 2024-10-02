const { User, secret_key } = require("../dals");
const { generateRandomString } = require("../utils");
const jwt = require('jsonwebtoken');

async function authenticateUser(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.password !== password) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign(
    {
      email: user.email,
      refresh_token: user.refresh_token
    }, secret_key, { expiresIn: '30d' })


  return token;
}

async function createUser(email, password) {

  const user = await User.create({ email,password,refresh_token:generateRandomString(10) });
  const token = jwt.sign(
    {
      email: user.email,
      refresh_token: user.refresh_token
    }, secret_key, { expiresIn: '30d' })


  return token;
}

module.exports = {
  authenticateUser,
  createUser
}
