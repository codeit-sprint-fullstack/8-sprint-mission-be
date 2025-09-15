const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger");
const { sequelize } = require("./config/database");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PostgreSQL 연결
sequelize
  .authenticate()
  .then(() => {
    console.log("PostgreSQL 연결 성공");
    return sequelize.sync(); // 테이블 생성
  })
  .then(() => {
    console.log("데이터베이스 동기화 완료");
  })
  .catch((error) => {
    console.error("PostgreSQL 연결 실패:", error);
  });

// Swagger API 문서 설정
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "판다마켓 API 문서",
  })
);

// 라우터 설정
app.use("/products", require("./routes/products"));
app.use("/articles", require("./routes/articles"));
app.use("/comments", require("./routes/comments"));

// 기본 라우트
app.get("/", (req, res) => {
  res.json({
    message: "판다마켓 API 서버가 실행 중입니다!",
    version: "1.0.0",
  });
});

// 404 에러 처리
app.use((req, res) => {
  res.status(404).json({ error: "요청한 리소스를 찾을 수 없습니다." });
});

// 에러 처리 미들웨어
app.use((error, req, res, next) => {
  console.error("서버 오류:", error);
  res.status(500).json({ error: "서버 내부 오류가 발생했습니다." });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
