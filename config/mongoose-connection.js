const mongoose = require('mongoose');
const connectDb = async() => 
{  
  for(let i = 0 ; i < 3 ; i++)
  {
    try{
      await mongoose.connect("mongodb://127.0.0.1:27017/test");
      console.log("Connected to MongoDB");
      break;
  }
    catch(err){
      console.error(`failed to connect in ${i + 1} attempts`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      if(i === 2){
        console.error("Failed to connect to MongoDB after 3 attempts");
        process.exit(1);}
  }
  }
}
module.exports = connectDb;