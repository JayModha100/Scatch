const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 3
  },

  email: {
    type: String,
    unique: true
  },

  password: String,

  cart: {
    type: Array,
    default: []
  },

  contact: Number,

  picture: String
});

module.exports = mongoose.model("User", userSchema);