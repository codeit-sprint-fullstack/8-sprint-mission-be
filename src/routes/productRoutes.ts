import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import {
  favoriteProduct,
  unfavoriteProduct,
} from "../controllers/likeController";
import { getComments, createComment } from "../controllers/commentController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware } from "../middlewares/authMiddleware";
import { checkOwnership } from "../middlewares/ownership";
import { validateProduct } from "../middlewares/validateProduct";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: 상품 관련 API
 *   - name: Comments
 *     description: 댓글 관련 API
 *   - name: Favorites
 *     description: 좋아요 관련 API
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: 상품 목록 조회
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 상품명 검색어
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
 *         description: 한 번에 불러올 상품 개수
 *     responses:
 *       200:
 *         description: 상품 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCount:
 *                   type: integer
 *                 list:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                       favoriteCount:
 *                         type: integer
 *       500:
 *         description: 서버 오류
 */
router.get("/", asyncHandler(getProducts));

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: 상품 상세 조회
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 상품 ID
 *     responses:
 *       200:
 *         description: 상품 상세 정보 반환
 *       404:
 *         description: 상품을 찾을 수 없음
 */
router.get("/:id", asyncHandler(getProductById));

/**
 * @swagger
 * /products:
 *   post:
 *     summary: 상품 등록
 *     tags: [Products]
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
 *               description:
 *                 type: string
 *               price:
 *                 type: integer
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: 상품이 등록됨
 *       401:
 *         description: 인증 실패
 */
router.post("/", authMiddleware, validateProduct, asyncHandler(createProduct));

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: 상품 수정
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 수정 완료
 *       404:
 *         description: 존재하지 않는 상품
 */
router.patch(
  "/:id",
  authMiddleware,
  checkOwnership("product"),
  asyncHandler(updateProduct)
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: 상품 삭제
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 삭제 완료
 *       404:
 *         description: 존재하지 않는 상품
 */
router.delete(
  "/:id",
  authMiddleware,
  checkOwnership("product"),
  asyncHandler(deleteProduct)
);

/**
 * @swagger
 * /products/{id}/favorite:
 *   post:
 *     summary: 상품 좋아요 등록
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 상품 ID
 *     responses:
 *       201:
 *         description: 좋아요 등록 완료
 *       401:
 *         description: 인증 실패
 *   delete:
 *     summary: 상품 좋아요 취소
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 상품 ID
 *     responses:
 *       200:
 *         description: 좋아요 취소 완료
 *       401:
 *         description: 인증 실패
 */
router.post("/:id/favorite", authMiddleware, asyncHandler(favoriteProduct));
router.delete("/:id/favorite", authMiddleware, asyncHandler(unfavoriteProduct));

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
 *     summary: 상품 댓글 작성
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
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
router.get("/:productId/comments", asyncHandler(getComments));
router.post(
  "/:productId/comments",
  authMiddleware,
  asyncHandler(createComment)
);

export default router;
