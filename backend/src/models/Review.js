const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

  productId: String,

  productName: String,

  name: String,

  rating: Number,

  comment: String,

  date: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Review", reviewSchema);