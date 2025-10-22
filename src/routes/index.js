import express from "express";
import articleRouter from "./articles.js";
import commentRouter from "./comments.js";
import productRouter from "./products.js";
import userRouter from "./users.js";

const router = express.Router();

router.use("/articles", articleRouter);
router.use("/comments", commentRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);

export default router;
