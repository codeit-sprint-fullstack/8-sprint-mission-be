import { Router } from 'express';
import { asyncHandeler } from '../../utils/errorHandler.js';
import { verifyAccessToken } from '../../middlewares/authGuard.js';
import {
  getProductCommentList,
  getProductComment,
  createProductComment,
  getArticleCommentList,
  getArticleComment,
  createArticleComment,
  updateComment,
  deleteComment,
} from './comments.controller.js';
const router = Router();

/* === 댓글 api === */
/* === 상품 댓글 api  === (조회, 생성) */
router.get('/products/:id/comments', asyncHandeler(getProductCommentList));
router.get('/products/:productId/comments/:id', asyncHandeler(getProductComment));
router.post('/products/:id/comments', verifyAccessToken, asyncHandeler(createProductComment));

/* === 게시글 댓글 api === (조회, 생성) */
router.get('/articles/:id/comments', asyncHandeler(getArticleCommentList));
router.get('/articles/:articleId/comments/:id', asyncHandeler(getArticleComment));
router.post('/articles/:id/comments', verifyAccessToken, asyncHandeler(createArticleComment));

/* === 공통 댓글 api (삭제, 수정)=== */
router.patch('/comments/:id', verifyAccessToken, asyncHandeler(updateComment));
router.delete('/comments/:id', verifyAccessToken, asyncHandeler(deleteComment));

export default router;
