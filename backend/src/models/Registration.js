const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  email: {
    type: String,
    default: ""
  },

  category: {
    type: String,
    required: true
  },

  course: {
    type: String,
    required: true
  },

  image: {
    type: String,
    default: ""
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Registration", registrationSchema);