import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import productRoutes from "./src/routes/ProductRoutes.js";
import articleRoutes from "./src/routes/ArticleRoutes.js";
import commentRoutes from "./src/routes/CommentRoutes.js";
import authRoutes from "./src/routes/AuthRoutes.js";
import uploadRoutes from "./src/routes/UploadRoutes.js";
import cors from "cors";
import {
  errorHandler,
  notFoundHandler,
} from "./src/middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger.js";
import path from "path";
import { fileURLToPath } from "url";

// ES 모듈에서 __dirname 사용하기
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    ].filter(Boolean), // undefined 값 제거
    credentials: true, // 쿠키 전송 허용
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"], // Set-Cookie 헤더 노출
    optionsSuccessStatus: 200, // IE11 지원을 위해
  })
);

// 미들웨어
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// 정적 파일 제공 (업로드된 이미지)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(authRoutes);
app.use(productRoutes);
app.use(articleRoutes);
app.use(commentRoutes);
app.use(uploadRoutes);

app.get("/", (req, res) => {
  res
    .status(200)
    .send("<h1 style='text-align: center;'>check backend api</h1>");
});

app.get("/hello", (req, res) => {
  res.status(200).send("Hellod World");
});

// 404 에러 핸들러 (모든 라우트 이후에 위치)
app.use(notFoundHandler);

// 전역 에러 핸들러 (가장 마지막에 위치)
app.use(errorHandler);

app.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}`);
});

export default app;
