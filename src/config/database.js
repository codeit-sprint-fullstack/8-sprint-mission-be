import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("mongoDB 연결");
  } catch (error) {
    console.error("mongoDB 연결 오류", error);
    process.exit(1); // 프로세스 종료
  }
};

export default connectDB;
