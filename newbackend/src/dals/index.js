const mongoose = require('mongoose');
const userSchema = require('./user.schema');

require('dotenv').config();

const mongoToken = process.env.mongodb
const secret_key = process.env.SECRET_KEY
const connection = mongoose.createConnection(mongoToken);

const User = connection.model('accounts', userSchema);

module.exports = {
  User,
  secret_key
}
