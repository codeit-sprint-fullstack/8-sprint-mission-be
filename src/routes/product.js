import express from 'express';
import { productController } from '../controllers/productController.js';
import { productFavoriteController } from '../controllers/productFavoriteController.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import { validateUUID, validateProduct } from '../middlewares/validation.js';
import { upload } from '../middlewares/upload.js';
import {
  authenticate,
  optionalAuthenticate,
  authorizeOwner,
} from '../middlewares/auth.js';
import { productRepository } from '../repositories/productRepository.js';

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Product]
 *     summary: 상품 목록 조회 (베스트 상품 포함)
 *     description: sort=favorite&limit=4 와 같이 사용하면 베스트 상품을 조회할 수 있습니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [recent, favorite, price]
 *           default: recent
 *         description: 정렬 기준 (recent=최신순, favorite=좋아요순, price=가격순)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: 조회할 상품 개수 제한 (베스트 상품 조회 시 사용)
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
 *         name: keyword
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
// 상품 목록 조회 (좋아요 상태 포함, limit 지원)
router.get(
  '/',
  optionalAuthenticate,
  asyncHandler(productController.getProducts),
);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags: [Product]
 *     summary: 상품 단건 조회
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
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: 상품을 찾을 수 없음
 */
// 상품 단건 조회 (댓글, 좋아요 상태 포함)
router.get(
  '/:id',
  optionalAuthenticate,
  validateUUID,
  asyncHandler(productController.getProductById),
);

/**
 * @swagger
 * /products:
 *   post:
 *     tags: [Product]
 *     summary: 상품 등록
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, description, price, tags]
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               tags: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: 유효하지 않은 요청
 *       401:
 *         description: 인증 필요
 */
// 상품 등록 (로그인 필수)
router.post(
  '/',
  authenticate,
  validateProduct,
  upload.single('image'),
  asyncHandler(productController.createProduct),
);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     tags: [Product]
 *     summary: 상품 수정
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               tags: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: 인증 필요 또는 권한 없음
 *       404:
 *         description: 상품을 찾을 수 없음
 */
// 상품 수정 (로그인 + 본인 확인)
router.patch(
  '/:id',
  authenticate,
  validateUUID,
  authorizeOwner(async req => {
    const product = await productRepository.findById(req.params.id);
    return product?.userId;
  }),
  upload.single('image'),
  asyncHandler(productController.updateProduct),
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags: [Product]
 *     summary: 상품 삭제
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
 *         description: 상품을 찾을 수 없음
 */
// 상품 삭제 (로그인 + 본인 확인)
router.delete(
  '/:id',
  authenticate,
  validateUUID,
  authorizeOwner(async req => {
    const product = await productRepository.findById(req.params.id);
    return product?.userId;
  }),
  asyncHandler(productController.deleteProduct),
);

/**
 * @swagger
 * /products/{id}/favorite:
 *   post:
 *     tags: [Product]
 *     summary: 상품 좋아요 토글 (추가/삭제)
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
 *         description: 상품을 찾을 수 없음
 */
// 좋아요 토글 (로그인 필수)
router.post(
  '/:id/favorite',
  authenticate,
  validateUUID,
  asyncHandler(productFavoriteController.toggleFavorite),
);

export default router;
