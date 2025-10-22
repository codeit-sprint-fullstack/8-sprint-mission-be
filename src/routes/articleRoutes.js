import express from "express";
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController.js";
import { likeArticle, unlikeArticle } from "../controllers/likeController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkOwnership } from "../middlewares/ownership.js";

const router = express.Router();

// 게시글 목록
router.get("/", asyncHandler(getArticles));
// 게시글 상세
router.get("/:id", asyncHandler(getArticleById));
// 게시글 등록 (로그인 필요)
router.post("/", authMiddleware, asyncHandler(createArticle));
// 게시글 수정 (작성자만)
router.patch(
  "/:id",
  authMiddleware,
  checkOwnership("article"),
  asyncHandler(updateArticle)
);
// 게시글 삭제 (작성자만)
router.delete(
  "/:id",
  authMiddleware,
  checkOwnership("article"),
  asyncHandler(deleteArticle)
);
// 좋아요 추가
router.post("/:id/like", authMiddleware, asyncHandler(likeArticle));
// 좋아요 취소
router.delete("/:id/like", authMiddleware, asyncHandler(unlikeArticle));

export default router;
