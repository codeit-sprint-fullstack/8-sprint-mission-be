import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import prisma from "./config/prisma.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import { swaggerUi, specs } from "./config/swagger.js";
import { assert } from "superstruct";

const app = express();
app.use(express.json());
app.use(cors());

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
