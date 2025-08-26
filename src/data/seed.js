import mongoose from "mongoose";
import mockData from "./mock.js";
import Product from "../models/Product.js";
import dotenv from "dotenv";

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    // 기존 데이터 삭제
    await Product.deleteMany({});

    // mock 데이터 삽입
    await Product.insertMany(mockData);

    console.log("데이터베이스 시딩 완료");
  } catch (error) {
    console.error("데이터베이스 시딩 실패", error);
  } finally {
    mongoose.disconnect();
  }
};

seedDB();
