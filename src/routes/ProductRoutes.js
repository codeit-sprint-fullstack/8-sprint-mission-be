import { Router } from "express";
import productController from "../controllers/productController.js";
const router = Router();

// 상품 목록 조회
router.get("/list", productController.getProducts);

// 상품 등록
router.post("/create", productController.createProduct);

export default router;
