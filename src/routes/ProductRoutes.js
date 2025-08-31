import { Router } from "express";
import productController from "../controllers/productController.js";
import commentController from "../controllers/commentController.js";
const router = Router();

// 상품 목록 조회
router.get("/products", productController.getProducts);

// 상품 상세 조회
router.get("/product/:id", productController.getProductById);

// 상품 등록
router.post("/product", productController.createProduct);

// 상품 수정
router.patch("/product/:id", productController.updateProduct);

// 상품 삭제
router.delete("/product/:id", productController.deleteProduct);

// 상품 댓글 등록
router.post("/product/:productId/comments", commentController.createProductComment);

// 상품 댓글 목록 조회
router.get("/product/:productId/comments", commentController.getProductComments);

export default router;
