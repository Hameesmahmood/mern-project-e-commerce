import mongoose from "mongoose";
import color from "colors";
import { error } from "console";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to MongoDB Databse ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`ERROR in Mongo DB ${error}`.bgRed.white);
  }
};

export default connectDB;
