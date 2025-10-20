import { Router } from "express";
import articleController from "../controllers/articleController.js";
import { validate } from "../middlewares/validate.js";
import {
  getArticlesSchema,
  createArticleSchema,
  articleIdSchema,
  updateArticleSchema,
} from "../validators/articleValidator.js";

const router = Router();

// 게시글 목록 조회
router
  .route("/articles")
  .get(validate(getArticlesSchema, "query"), articleController.getArticles) // 게시글 목록 조회
  .post(validate(createArticleSchema, "body"), articleController.createArticle); // 게시글 등록

// 게시글 상세 조회
router
  .route("/articles/:id")
  .get(validate(articleIdSchema, "params"), articleController.getArticleById) // 게시글 상세 조회
  .patch(validate(updateArticleSchema, "body"), articleController.updateArticle) // 게시글 수정
  .delete(validate(articleIdSchema, "params"), articleController.deleteArticle); // 게시글 삭제

export default router;
