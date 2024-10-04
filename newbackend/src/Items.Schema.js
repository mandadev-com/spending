const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true, // Automatically generate ObjectId
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  term: { type: String, required: true },
  occurrence: { type: String, required: true },
  direction: {
    type: String,
    // enum: ["income", "expense"],
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

// Export the model
module.exports = itemsSchema;
