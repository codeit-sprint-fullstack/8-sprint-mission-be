import express from "express";
import * as articleController from "../controllers/articleController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 게시글 목록
router.get("/", asyncHandler(articleController.getArticles));
// 게시글 상세
router.get("/:id", asyncHandler(articleController.getArticleById));
// 게시글 등록 (로그인 필요)
router.post("/", authMiddleware, asyncHandler(articleController.createArticle));
// 게시글 수정 (작성자만)
router.patch(
  "/:id",
  authMiddleware,
  asyncHandler(articleController.updateArticle)
);
// 게시글 삭제 (작성자만)
router.delete(
  "/:id",
  authMiddleware,
  asyncHandler(articleController.deleteArticle)
);
// 좋아요 추가
router.post(
  "/:id/like",
  authMiddleware,
  asyncHandler(articleController.likeArticle)
);
// 좋아요 취소
router.delete(
  "/:id/like",
  authMiddleware,
  asyncHandler(articleController.unlikeArticle)
);

export default router;
