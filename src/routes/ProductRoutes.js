import { Router } from "express";
import productController from "../controllers/productController.js";
const router = Router();

// 상품 목록 조회
router.get("/list", productController.getProducts);

// 상품 상세 조회
router.get("/detail/:id", productController.getProductById);

// 상품 등록
router.post("/create", productController.createProduct);

// 상품 수정
router.patch("/update/:id", productController.updateProduct);

// 상품 삭제
router.delete("/delete/:id", productController.deleteProduct);

export default router;
