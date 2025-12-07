import { Router } from "express";

// // 도메인 라우터
import authRouter from "./auth/index";
import articlesRouter from "./articles/index";
import productsRouter from "./products/index";
import commentsRouter from "./comments/index";
import uploadsRouter from "./uploads/index";

const router = Router();

router.use("/auth", authRouter);
router.use("/articles", articlesRouter);
router.use("/products", productsRouter);
router.use("/", commentsRouter);
router.use("/", uploadsRouter);

export default router;
