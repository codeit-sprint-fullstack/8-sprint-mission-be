import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productsRouter from "./routes/products.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: (process.env.CORS_ORIGIN || "http://localhost:5173")
      .split(",")
      .map((s) => s.trim()),
  })
);

app.get("/panda-market/health", (_req, res) =>
  res.json({ service: "panda-market", ok: true, now: new Date().toISOString() })
);
app.get("/panda-market/ready", async (_req, res) => {
  const state = mongoose.connection.readyState; // 0:disconnected, 1:connected, 2:connecting, 3:disconnecting
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  const info = {
    service: "panda-market",
    db: states[state] ?? "unknown",
    now: new Date().toISOString(),
  };
  if (state !== 1) return res.status(503).json(info);
  try {
    await mongoose.connection.db.admin().command({ ping: 1 });
    return res.json(info);
  } catch {
    return res.status(503).json({ ...info, ping: "failed" });
  }
});

//  DB 연결 안 되어 있으면 /products 전부 503으로 막기(버퍼링 타임아웃 방지)
function requireDbReady(req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Database not connected" });
  }
  next();
}
app.use(requireDbReady);
app.use("/products", productsRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🐼 Panda Market API listening on http://localhost:${PORT}`);

  //  연결 상태 로그
  mongoose.connection.on("connecting", () =>
    console.log("MongoDB connecting...")
  );
  mongoose.connection.on("connected", () => console.log("MongoDB connected"));
  mongoose.connection.on("error", (e) =>
    console.error("MongoDB error:", e.message)
  );
  mongoose.connection.on("disconnected", () =>
    console.warn("MongoDB disconnected")
  );

  mongoose
    .connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true,
    })
    .catch(() => {}); // 에러는 위 on("error")에서 로깅됨
});
