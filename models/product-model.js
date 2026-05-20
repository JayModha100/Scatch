const mongoose = require("mongoose");

const Productmodel = mongoose.model("Product", new mongoose.Schema({
  name: String,
  image : String,
  price : Number,
  bgcolor : String,
  textcolor : String,
  panelcolor : String,
  discount : Number,
}))
module.exports = Productmodel
