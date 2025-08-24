import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import productRoutes from "./src/routes/ProductRoutes.js";

const app = express();

// 환경변수 설정
dotenv.config();

connectDB()
  .then(() => {
    console.log("mongoDB 연결 성공");
  })
  .catch((err) => {
    console.error("mongoDB 연결 실패", err);
    process.exit(1);
  });

// 포트 설정
app.set("port", process.env.PORT || 8000);

// 미들웨어
app.use(express.json());
app.use(morgan("dev"));
app.use(productRoutes);

app.get("/hello", (req, res) => {
  res.status(200).send("Hellod World");
});

// 404 에러처리
app.use((req, res) => {
  res.status(404).send("404 NOT FOUND");
});

// 500 에러처리
app.use((err, req, res, next) => {
  res.status(500).send(err.message || "500 SERVER ERROR");
  console.error(err);
});

app.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}`);
});

export default app;
