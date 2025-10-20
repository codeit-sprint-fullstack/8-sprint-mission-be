import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import productRoutes from "./src/routes/ProductRoutes.js";
import articleRoutes from "./src/routes/ArticleRoutes.js";
import commentRoutes from "./src/routes/CommentRoutes.js";
import cors from "cors";

const app = express();

// 환경변수 설정
dotenv.config();

// 포트 설정
app.set("port", process.env.PORT || 8000);

// CORS 설정
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      process.env.CORS_ORIGIN_DEV,
      process.env.CORS_ORIGIN_PROD,
    ], // undefined 값 제거
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 200, // IE11 지원을 위해
  })
);

// 미들웨어
app.use(express.json());
app.use(morgan("dev"));
app.use(productRoutes);
app.use(articleRoutes);
app.use(commentRoutes);

app.get("/", (req, res) => {
  res
    .status(200)
    .send("<h1 style='text-align: center;'>check backend api</h1>");
});

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
