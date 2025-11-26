import express from "express";
import articleRouter from "./articleRoutes.js";
import commentRouter from "./commentRoutes.js";
import productRouter from "./productRoutes.js";
import uploadRouter from "./uploadRoutes.js";
import authRouter from "./authRoutes.js";

const router = express.Router();

router.use("/articles", articleRouter);
router.use("/comments", commentRouter);
router.use("/products", productRouter);
router.use("/image", uploadRouter);
router.use("/auth", authRouter);

export default router;
