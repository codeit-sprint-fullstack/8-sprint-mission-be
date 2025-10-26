/**
 * @swagger
 * /articles:
 *   get:
 *     summary: 게시글 목록 조회
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 페이지당 항목 수
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [recent, like]
 *           default: recent
 *         description: 정렬 기준
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: 검색 키워드
 *       - in: query
 *         name: isBest
 *         schema:
 *           type: boolean
 *         description: 베스트 게시글 여부
 *     responses:
 *       200:
 *         description: 게시글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *                 totalCount:
 *                   type: integer
 *   post:
 *     summary: 게시글 등록
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 description: 게시글 제목
 *               content:
 *                 type: string
 *                 description: 게시글 내용
 *     responses:
 *       201:
 *         description: 게시글 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       401:
 *         description: 인증 실패
 */

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: 게시글 상세 조회
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 게시글 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: 게시글을 찾을 수 없음
 *
 *   patch:
 *     summary: 게시글 수정
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: 게시글 수정 성공
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 권한 없음
 *       404:
 *         description: 게시글을 찾을 수 없음
 *
 *   delete:
 *     summary: 게시글 삭제
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: 게시글 삭제 성공
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 권한 없음
 *       404:
 *         description: 게시글을 찾을 수 없음
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         likeCount:
 *           type: integer
 *         isLiked:
 *           type: boolean
 *           description: 현재 사용자의 좋아요 여부
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             nickname:
 *               type: string
 *             image:
 *               type: string
 */
/**
 * @swagger
 * /articles/{articleId}/like:
 *   post:
 *     summary: 게시글 좋아요 토글
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 좋아요 토글 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isLiked:
 *                   type: boolean
 *                   description: 좋아요 여부
 *       401:
 *         description: 인증 실패
 *       404:
 *         description: 게시글을 찾을 수 없음
 */

import { Router } from "express";
import articleController from "../controllers/articleController.js";
import likeController from "../controllers/likeController.js";
import { validate } from "../middlewares/validate.js";
import {
  getArticlesSchema,
  createArticleSchema,
  articleIdSchema,
  updateArticleSchema,
} from "../validators/articleValidator.js";
import { articleLikeSchema } from "../validators/likeValidator.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

// 게시글 목록 조회
router
  .route("/articles")
  .get(validate(getArticlesSchema, "query"), articleController.getArticles) // 게시글 목록 조회
  .post(
    authenticate,
    validate(createArticleSchema, "body"),
    articleController.createArticle
  ); // 게시글 등록

// 게시글 상세 조회
router
  .route("/articles/:id")
  .get(validate(articleIdSchema, "params"), articleController.getArticleById) // 게시글 상세 조회
  .patch(validate(updateArticleSchema, "body"), articleController.updateArticle) // 게시글 수정
  .delete(validate(articleIdSchema, "params"), articleController.deleteArticle); // 게시글 삭제

// 게시글 좋아요 토글
router.post(
  "/articles/:articleId/like",
  authenticate,
  validate(articleLikeSchema, "params"),
  likeController.toggleArticleLike
);

export default router;
