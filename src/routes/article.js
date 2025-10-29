import express from 'express';
import { articleController } from '../controllers/articleController.js';
import { articleFavoriteController } from '../controllers/articleFavoriteController.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import {
  validateUUID,
  validateArticleData,
} from '../middlewares/validation.js';
import {
  authenticate,
  optionalAuthenticate,
  authorizeOwner,
} from '../middlewares/auth.js';
import { articleRepository } from '../repositories/articleRepository.js';

const router = express.Router();

/**
 * @swagger
 * /articles:
 *   get:
 *     tags: [Article]
 *     summary: 게시글 목록 조회
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [recent, favorite]
 *           default: recent
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 list:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *                 totalCount: { type: integer }
 */
// 게시글 목록 조회 (검색, 최신순, offset 페이지네이션)
router.get(
  '/',
  optionalAuthenticate,
  asyncHandler(articleController.getArticles),
);

/**
 * @swagger
 * /articles:
 *   post:
 *     tags: [Article]
 *     summary: 게시글 등록
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *     responses:
 *       201:
 *         description: 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: 유효하지 않은 요청
 *       401:
 *         description: 인증 필요
 */
// 게시글 등록 (로그인 필수)
router.post(
  '/',
  authenticate,
  validateArticleData,
  asyncHandler(articleController.createArticle),
);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     tags: [Article]
 *     summary: 게시글 단건 조회
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
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
// 게시글 단건 조회 (댓글, 좋아요 상태 포함)
router.get(
  '/:id',
  optionalAuthenticate,
  validateUUID,
  asyncHandler(articleController.getArticleById),
);

/**
 * @swagger
 * /articles/{id}:
 *   patch:
 *     tags: [Article]
 *     summary: 게시글 수정
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
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *     responses:
 *       200:
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       401:
 *         description: 인증 필요 또는 권한 없음
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
// 게시글 수정 (로그인 + 본인 확인)
router.patch(
  '/:id',
  authenticate,
  validateUUID,
  authorizeOwner(async req => {
    const article = await articleRepository.findById(req.params.id);
    return article?.userId;
  }),
  asyncHandler(articleController.updateArticle),
);

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     tags: [Article]
 *     summary: 게시글 삭제
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
 *         description: 게시글을 찾을 수 없음
 */
// 게시글 삭제 (로그인 + 본인 확인)
router.delete(
  '/:id',
  authenticate,
  validateUUID,
  authorizeOwner(async req => {
    const article = await articleRepository.findById(req.params.id);
    return article?.userId;
  }),
  asyncHandler(articleController.deleteArticle),
);

/**
 * @swagger
 * /articles/{id}/favorite:
 *   post:
 *     tags: [Article]
 *     summary: 게시글 좋아요 토글 (추가/삭제)
 *     description: 좋아요 상태를 자동으로 토글합니다. 이미 좋아요한 경우 삭제, 아닌 경우 추가됩니다.
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
 *       200:
 *         description: 좋아요 토글 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 isLiked: { type: boolean }
 *                 favoriteCount: { type: integer }
 *       401:
 *         description: 인증 필요
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
// 좋아요 토글 (로그인 필수)
router.post(
  '/:id/favorite',
  authenticate,
  validateUUID,
  asyncHandler(articleFavoriteController.toggleFavorite),
);

export default router;
