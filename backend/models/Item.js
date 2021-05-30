const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    deafault: Date.now,
  },
});

module.exports = Item = mongoose.model("Item", itemSchema);
