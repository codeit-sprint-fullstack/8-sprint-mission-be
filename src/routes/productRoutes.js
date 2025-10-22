import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import {
  favoriteProduct,
  unfavoriteProduct,
} from "../controllers/likeController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 상품 목록
router.get("/", asyncHandler(getProducts));
// 상품 상세
router.get("/:id", asyncHandler(getProductById));
// 상품 등록
router.post("/", authMiddleware, asyncHandler(createProduct));
// 상품 수정
router.patch("/:id", authMiddleware, asyncHandler(updateProduct));
// 상품 삭제
router.delete("/:id", authMiddleware, asyncHandler(deleteProduct));
// 좋아요 추가
router.post("/:id/favorite", authMiddleware, asyncHandler(favoriteProduct));
// 좋아요 취소
router.delete("/:id/favorite", authMiddleware, asyncHandler(unfavoriteProduct));

export default router;
