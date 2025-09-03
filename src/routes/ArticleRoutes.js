import { Router } from "express";
import articleController from "../controllers/articleController.js";
import commentController from "../controllers/commentController.js";
const router = Router();

// 게시글 목록 조회
router.get("/articles", articleController.getArticles);

// 게시글 상세 조회
router.get("/article/:id", articleController.getArticleById);

// 게시글 등록
router.post("/article", articleController.createArticle);

// 게시글 수정
router.patch("/article/:id", articleController.updateArticle);

// 게시글 삭제
router.delete("/article/:id", articleController.deleteArticle);

// 게시글 댓글 등록
router.post("/article/:articleId/comments", commentController.createArticleComment);

// 게시글 댓글 목록 조회
router.get("/article/:articleId/comments", commentController.getArticleComments);

export default router;
