import mongoose from "mongoose"

const Usermodel = mongoose.model("User", new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength : 3,
    
  },
  email: String,
  password: String,
  cart : [],
  isAdmin : Boolean,
  orders : [],
  contact : Number,
  picture : Buffer
}))
module.exports = Usermodel
