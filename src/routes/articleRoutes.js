import express from "express";
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController.js";
import { likeArticle, unlikeArticle } from "../controllers/likeController.js";
import {
  getComments,
  createComment,
} from "../controllers/commentController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkOwnership } from "../middlewares/ownership.js";
import { validateArticle } from "../middlewares/validateArticle.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Articles
 *     description: 게시글 관련 API
 *   - name: Comments
 *     description: 댓글 관련 API
 *   - name: Likes
 *     description: 좋아요 관련 API
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: 게시글 목록 조회
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 제목 검색어
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [newest, oldest, like]
 *         description: 정렬 기준 (최신, 오래된, 좋아요순)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: 불러올 게시글 개수
 *     responses:
 *       200:
 *         description: 게시글 목록 반환
 */
router.get("/", asyncHandler(getArticles));

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: 게시글 상세 조회
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 게시글 상세 정보 반환
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
router.get("/:id", asyncHandler(getArticleById));

/**
 * @swagger
 * /articles:
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
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: 게시글 등록 완료
 *       401:
 *         description: 인증 실패
 */
router.post("/", authMiddleware, validateArticle, asyncHandler(createArticle));

/**
 * @swagger
 * /articles/{id}:
 *   patch:
 *     summary: 게시글 수정
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
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
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: 게시글 수정 완료
 *       404:
 *         description: 존재하지 않는 게시글
 */
router.patch(
  "/:id",
  authMiddleware,
  checkOwnership("article"),
  asyncHandler(updateArticle)
);

/**
 * @swagger
 * /articles/{id}:
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
 *         description: 삭제 완료
 *       404:
 *         description: 존재하지 않는 게시글
 */
router.delete(
  "/:id",
  authMiddleware,
  checkOwnership("article"),
  asyncHandler(deleteArticle)
);

/**
 * @swagger
 * /articles/{id}/like:
 *   post:
 *     summary: 게시글 좋아요 등록
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       201:
 *         description: 좋아요 등록 완료
 *       401:
 *         description: 인증 실패
 *   delete:
 *     summary: 게시글 좋아요 취소
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: 좋아요 취소 완료
 *       401:
 *         description: 인증 실패
 */
router.post("/:id/like", authMiddleware, asyncHandler(likeArticle));
router.delete("/:id/like", authMiddleware, asyncHandler(unlikeArticle));

/**
 * @swagger
 * /articles/{articleId}/comments:
 *   get:
 *     summary: 게시글 댓글 목록 조회
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: 댓글 불러올 개수
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *         description: 다음 페이지 커서
 *     responses:
 *       200:
 *         description: 댓글 목록 반환
 *   post:
 *     summary: 게시글 댓글 작성
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
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
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: 댓글 작성 완료
 *       401:
 *         description: 인증 실패
 */
router.get("/:articleId/comments", asyncHandler(getComments));
router.post(
  "/:articleId/comments",
  authMiddleware,
  asyncHandler(createComment)
);

export default router;
