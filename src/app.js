import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";
import { assert } from "superstruct";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads")); // 이미지 허용

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", routes);

app.use(errorHandler);

export default app;

const PORT = 5000;
app.listen(5000, () =>
  console.log(`Server Started: http://localhost:${PORT}/freeboard`)
);
