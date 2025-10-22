import express from "express";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const router = express.Router();

// 게시글 댓글 조회
router.get("/articles/:articleId", asyncHandler(getComments));
// 게시글 댓글 등록
router.post(
  "/articles/:articleId",
  authMiddleware,
  asyncHandler(createComment)
);

// 상품 댓글 조회
router.get("/products/:productId", asyncHandler(getComments));
// 상품 댓글 등록
router.post(
  "/products/:productId",
  authMiddleware,
  asyncHandler(createComment)
);

// 댓글 수정 (작성자만)
router.patch("/:id", authMiddleware, asyncHandler(updateComment));
// 댓글 삭제 (작성자만)
router.delete("/:id", authMiddleware, asyncHandler(deleteComment));

export default router;
