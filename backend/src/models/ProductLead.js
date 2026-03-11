const mongoose = require("mongoose");

const productLeadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  product: String,
  category: String,
  status: {
    type: String,
    default: "Interested"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ProductLead", productLeadSchema);
