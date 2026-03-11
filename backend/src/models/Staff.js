const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: String,
  phone: String,
  role: String,
  experience: Number,
  status: {
    type: String,
    default: "Active"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Staff", staffSchema);