import express from 'express';
import { articleController } from '../controllers/articleController.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import {
  validateUUID,
  validateArticleData,
} from '../middlewares/validation.js';

const router = express.Router();

// 게시글 등록
router.post(
  '/',
  validateArticleData,
  asyncHandler(articleController.createArticle),
);

// 게시글 단건 조회
router.get(
  '/:id',
  validateUUID,
  asyncHandler(articleController.getArticleById),
);

// 게시글 수정
router.patch(
  '/:id',
  validateUUID,
  asyncHandler(articleController.updateArticle),
);

// 게시글 삭제
router.delete(
  '/:id',
  validateUUID,
  asyncHandler(articleController.deleteArticle),
);

// 게시글 목록 조회 (검색, 최신순, offset 페이지네이션)
router.get('/', asyncHandler(articleController.getArticles));

export default router;
