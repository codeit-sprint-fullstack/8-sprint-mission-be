import "dotenv/config";
import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js";
import productsRouter from "./routes/products.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: (process.env.CORS_ORIGIN || "http://localhost:5173")
      .split(",")
      .map((s) => s.trim()),
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.get("/panda-market/health", (_req, res) =>
  res.json({ service: "panda-market", ok: true, now: new Date().toISOString() })
);

app.get("/panda-market/ready", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.json({
      service: "panda-market",
      db: "connected",
      now: new Date().toISOString(),
    });
  } catch {
    return res
      .status(503)
      .json({ service: "panda-market", db: "disconnected" });
  }
});

app.use("/products", productsRouter);

// 공통 에러 핸들러
app.use((err, _req, res, _next) => {
  const m = String(err?.message || "");
  if (
    m.includes("Record to update not found") ||
    m.includes("Record to delete does not exist")
  ) {
    return res.status(404).json({ message: "대상을 찾을 수 없습니다." });
  }
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    `🐼 Panda Market API (PostgreSQL) listening on http://localhost:${PORT}`
  );
});
