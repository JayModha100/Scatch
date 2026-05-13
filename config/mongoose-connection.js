import mongoose from "mongoose";
const connectDB = async () => {
  for(let i = 0; i < 3; i++)
    {try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
  } catch (error) {
    console.error(`Attempt ${i + 1} failed:`, error);
    if (i === 2) {
      console.error('All connection attempts failed. Exiting process.');
      process.exit(1);
    }
    await new Promise(res => setTimeout(res, 2000)); // Wait 2 seconds before retrying
  }
};
export default connectDB
}
