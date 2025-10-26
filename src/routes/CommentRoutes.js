/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         content:
 *           type: string
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

import { Router } from "express";
import commentController from "../controllers/commentController.js";
import { validate } from "../middlewares/validate.js";
import {
  articleIdParamSchema,
  productIdParamSchema,
  articleCommentParamSchema,
  productCommentParamSchema,
  createCommentSchema,
  updateCommentSchema,
} from "../validators/commentValidator.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { RESOURCE_HANDLERS } from "../utils/resourceHandlers.js";

const router = Router();

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
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 댓글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: 게시글을 찾을 수 없음
 *   post:
 *     summary: 게시글 댓글 등록
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: 댓글 내용
 *     responses:
 *       201:
 *         description: 댓글 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         description: 인증 실패
 *       404:
 *         description: 게시글을 찾을 수 없음
 */

// 게시글 댓글 목록 조회
router
  .route("/articles/:articleId/comments")
  .get(
    validate(articleIdParamSchema, "params"),
    commentController.getArticleComments
  )
  .post(
    authenticate,
    validate(articleIdParamSchema, "params"),
    validate(createCommentSchema, "body"),
    commentController.createArticleComment
  );

/**
 * @swagger
 * /articles/{articleId}/comments/{commentId}:
 *   patch:
 *     summary: 게시글 댓글 수정
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시글 ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: 댓글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: 댓글 내용
 *     responses:
 *       200:
 *         description: 댓글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 권한 없음
 *       404:
 *         description: 댓글을 찾을 수 없음
 *   delete:
 *     summary: 게시글 댓글 삭제
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시글 ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: 댓글 ID
 *     responses:
 *       204:
 *         description: 댓글 삭제 성공
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 권한 없음
 *       404:
 *         description: 댓글을 찾을 수 없음
 */

router
  .route("/articles/:articleId/comments/:commentId")
  .patch(
    authenticate,
    authorize(RESOURCE_HANDLERS.comment.getOwnerId),
    validate(articleCommentParamSchema, "params"),
    validate(updateCommentSchema, "body"),
    commentController.updateArticleComment
  )
  .delete(
    authenticate,
    authorize(RESOURCE_HANDLERS.comment.getOwnerId),
    validate(articleCommentParamSchema, "params"),
    commentController.deleteArticleComment
  );

/**
 * @swagger
 * /products/{productId}/comments:
 *   get:
 *     summary: 상품 댓글 목록 조회
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: 상품 ID
 *     responses:
 *       200:
 *         description: 댓글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: 상품을 찾을 수 없음
 *   post:
 *     summary: 상품 댓글 등록
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: 상품 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: 댓글 내용
 *     responses:
 *       201:
 *         description: 댓글 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         description: 인증 실패
 *       404:
 *         description: 상품을 찾을 수 없음
 */

router
  .route("/products/:productId/comments")
  .get(
    validate(productIdParamSchema, "params"),
    commentController.getProductComments
  )
  .post(
    authenticate,
    validate(productIdParamSchema, "params"),
    validate(createCommentSchema, "body"),
    commentController.createProductComment
  );

/**
 * @swagger
 * /products/{productId}/comments/{commentId}:
 *   patch:
 *     summary: 상품 댓글 수정
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: 상품 ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: 댓글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: 댓글 내용
 *     responses:
 *       200:
 *         description: 댓글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 권한 없음
 *       404:
 *         description: 댓글을 찾을 수 없음
 *   delete:
 *     summary: 상품 댓글 삭제
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: 상품 ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: 댓글 ID
 *     responses:
 *       204:
 *         description: 댓글 삭제 성공
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 권한 없음
 *       404:
 *         description: 댓글을 찾을 수 없음
 */

router
  .route("/products/:productId/comments/:commentId")
  .patch(
    authenticate,
    authorize(RESOURCE_HANDLERS.comment.getOwnerId),
    validate(productCommentParamSchema, "params"),
    validate(updateCommentSchema, "body"),
    commentController.updateProductComment
  )
  .delete(
    authenticate,
    authorize(RESOURCE_HANDLERS.comment.getOwnerId),
    validate(productCommentParamSchema, "params"),
    commentController.deleteProductComment
  );

export default router;
