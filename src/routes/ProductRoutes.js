import { Router } from "express";
import productController from "../controllers/productController.js";
import commentController from "../controllers/commentController.js";
const router = Router();

// 상품 목록 조회
router.get("/products", productController.getProducts);

// 상품 상세 조회
router.get("/products/:id", productController.getProductById);

// 상품 등록
router.post("/products", productController.createProduct);

// 상품 수정
router.patch("/products/:id", productController.updateProduct);

// 상품 삭제
router.delete("/products/:id", productController.deleteProduct);

// 상품 댓글 등록
router.post(
  "/products/:productId/comments",
  commentController.createProductComment
);

// 상품 댓글 목록 조회
router.get(
  "/products/:productId/comments",
  commentController.getProductComments
);

export default router;
