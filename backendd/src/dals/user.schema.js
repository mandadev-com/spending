const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  refresh_token: { type: String, required: true }
});

module.exports = userSchema
