import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DATABASE_NAME || undefined
    });
    console.log(`MongoDB connected to database: ${connection.connection.db.databaseName}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // thoát app nếu không kết nối được
  }
};

export default connectDB;
