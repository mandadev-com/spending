const mongoose = require("mongoose");
const userSchema = require("./user.schema");
const itemsSchema = require("../Items.Schema");

require("dotenv").config();

const mongoToken = process.env.mongodb;
const secret_key = process.env.SECRET_KEY;
const connection = mongoose.createConnection(mongoToken);

const User = connection.model("accounts", userSchema);
const Items = connection.model("Items", itemsSchema);

module.exports = {
  User,
  Items,
  secret_key,
};
