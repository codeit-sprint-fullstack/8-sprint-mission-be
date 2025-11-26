import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import { swaggerUi, specs } from "./config/swagger.js";
const app = express();
app.use(express.json());
const allowedOrigins = ["http://localhost:3000"];
app.use(cors({
    origin: allowedOrigins,
    credentials: true, // 쿠키, Authorization 헤더 허용
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
}));
app.use("/uploads", express.static("uploads")); // 이미지 허용
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api", routes);
app.use(errorHandler);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server Started: http://localhost:${PORT}/api`);
    console.log(`Swagger Docs: http://localhost:${PORT}/api/docs`);
});
export default app;
