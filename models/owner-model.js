import mongoose from "mongoose"

const Ownermodel = mongoose.model("Owner", new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength : 3,
    
  },
  email: String,
  password: String,
  products: [],
  contact : Number,
  picture : String,
}))
module.exports = Ownermodel
