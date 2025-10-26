import express from 'express';
import { commentController } from '../controllers/commentController.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import {
  validateUUID,
  validateParamUUID,
  validateCommentData,
} from '../middlewares/validation.js';
import { authenticate, authorizeOwner } from '../middlewares/auth.js';
import { commentRepository } from '../repositories/commentRepository.js';

const router = express.Router();

/**
 * @swagger
 * /comments/article/{articleId}:
 *   get:
 *     tags: [Comment]
 *     summary: 게시글 댓글 목록 조회
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
// 자유게시판 댓글 목록 조회
router.get(
  '/article/:articleId',
  validateParamUUID('articleId'),
  asyncHandler(commentController.getArticleComments),
);

/**
 * @swagger
 * /comments/product/{productId}:
 *   get:
 *     tags: [Comment]
 *     summary: 상품 댓글 목록 조회
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
// 중고마켓 댓글 목록 조회
router.get(
  '/product/:productId',
  validateParamUUID('productId'),
  asyncHandler(commentController.getProductComments),
);

/**
 * @swagger
 * /comments/article/{articleId}:
 *   post:
 *     tags: [Comment]
 *     summary: 게시글 댓글 등록
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content: { type: string }
 *     responses:
 *       201:
 *         description: 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         description: 인증 필요
 */
// 자유게시판 댓글 등록 (로그인 필수)
router.post(
  '/article/:articleId',
  authenticate,
  validateParamUUID('articleId'),
  validateCommentData,
  asyncHandler(commentController.createArticleComment),
);

/**
 * @swagger
 * /comments/product/{productId}:
 *   post:
 *     tags: [Comment]
 *     summary: 상품 댓글 등록
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content: { type: string }
 *     responses:
 *       201:
 *         description: 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         description: 인증 필요
 */
// 중고마켓 댓글 등록 (로그인 필수)
router.post(
  '/product/:productId',
  authenticate,
  validateParamUUID('productId'),
  validateCommentData,
  asyncHandler(commentController.createProductComment),
);

/**
 * @swagger
 * /comments/{id}:
 *   patch:
 *     tags: [Comment]
 *     summary: 댓글 수정
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content: { type: string }
 *     responses:
 *       200:
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         description: 인증 필요 또는 권한 없음
 *       404:
 *         description: 댓글을 찾을 수 없음
 */
// 댓글 수정 (로그인 + 본인 확인)
router.patch(
  '/:id',
  authenticate,
  validateUUID,
  authorizeOwner(async req => {
    const comment = await commentRepository.findById(req.params.id);
    return comment?.userId;
  }),
  asyncHandler(commentController.updateComment),
);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     tags: [Comment]
 *     summary: 댓글 삭제
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: 삭제 성공
 *       401:
 *         description: 인증 필요 또는 권한 없음
 *       404:
 *         description: 댓글을 찾을 수 없음
 */
// 댓글 삭제 (로그인 + 본인 확인)
router.delete(
  '/:id',
  authenticate,
  validateUUID,
  authorizeOwner(async req => {
    const comment = await commentRepository.findById(req.params.id);
    return comment?.userId;
  }),
  asyncHandler(commentController.deleteComment),
);

export default router;
