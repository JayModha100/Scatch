const mongoose = require('mongoose');
const dbgr = require('debug')('development:mongoose');

const connectDb = async () => {  
  const uri = 
    "mongodb://admin:password@localhost:27017/test?authSource=admin";
  
  for (let i = 0; i < 3; i++) {
    try {
      await mongoose.connect(uri);
      dbgr("Connected to MongoDB");
      break;
    } catch (err) {
      dbgr(`Attempt ${i + 1} failed: ${err.message}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (i === 2) {
        dbgr("Failed to connect to MongoDB after 3 attempts");
        process.exit(1);
      }
    }
  }
};

module.exports = connectDb;