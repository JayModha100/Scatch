const mongoose = require('mongoose');

const userModel = mongoose.model("User", new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength : 3, 
  },
  email: String,
  password: String,
  cart : [],
  orders : [],
  contact : Number,
  picture : String
}))
module.exports = userModel
