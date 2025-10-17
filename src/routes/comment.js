import express from 'express';
import { commentController } from '../controllers/commentController.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import {
  validateUUID,
  validateParamUUID,
  validateCommentData,
} from '../middlewares/validation.js';

const router = express.Router();

// 자유게시판 댓글 등록
router.post(
  '/article/:articleId',
  validateParamUUID('articleId'),
  validateCommentData,
  asyncHandler(commentController.createArticleComment),
);

// 중고마켓 댓글 등록
router.post(
  '/product/:productId',
  validateParamUUID('productId'),
  validateCommentData,
  asyncHandler(commentController.createProductComment),
);

// 댓글 수정
router.patch(
  '/:id',
  validateUUID,
  asyncHandler(commentController.updateComment),
);

// 댓글 삭제
router.delete(
  '/:id',
  validateUUID,
  asyncHandler(commentController.deleteComment),
);

// 자유게시판 댓글 목록 조회
router.get(
  '/article/:articleId',
  validateParamUUID('articleId'),
  asyncHandler(commentController.getArticleComments),
);

// 중고마켓 댓글 목록 조회
router.get(
  '/product/:productId',
  validateParamUUID('productId'),
  asyncHandler(commentController.getProductComments),
);

export default router;
