/**
 * @swagger
 * /products:
 *   get:
 *     summary: 상품 목록 조회
 *     tags: [Products]
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
 *     responses:
 *       200:
 *         description: 상품 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 totalCount:
 *                   type: integer
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
 *             required:
 *               - name
 *               - description
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 description: 상품명
 *               description:
 *                 type: string
 *                 description: 상품 설명
 *               price:
 *                 type: integer
 *                 description: 가격
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 태그 목록
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                 description: 이미지 URL 목록
 *     responses:
 *       201:
 *         description: 상품 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: 인증 실패
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: 상품 상세 조회
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 상품 ID
 *     responses:
 *       200:
 *         description: 상품 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: 상품을 찾을 수 없음
 *
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 상품명
 *               description:
 *                 type: string
 *                 description: 상품 설명
 *               price:
 *                 type: integer
 *                 description: 가격
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 태그 목록
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                 description: 이미지 URL 목록
 *     responses:
 *       200:
 *         description: 상품 수정 성공
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 권한 없음
 *       404:
 *         description: 상품을 찾을 수 없음
 *
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
 *       204:
 *         description: 상품 삭제 성공
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 권한 없음
 *       404:
 *         description: 상품을 찾을 수 없음
 */

/**
 * @swagger
 * /products/{productId}/like:
 *   post:
 *     summary: 상품 좋아요 토글
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: 상품 ID
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
 *         description: 상품을 찾을 수 없음
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: integer
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
 *         tags:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *         images:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               order:
 *                 type: integer
 *               image:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   url:
 *                     type: string
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
import productController from "../controllers/productController.js";
import likeController from "../controllers/likeController.js";
import { validate } from "../middlewares/validate.js";
import {
  getProductsSchema,
  createProductSchema,
  productIdSchema,
  updateProductSchema,
} from "../validators/productValidator.js";
import { productLikeSchema } from "../validators/likeValidator.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router
  .route("/products")
  .get(validate(getProductsSchema, "query"), productController.getProducts)
  .post(
    authenticate,
    validate(createProductSchema, "body"),
    productController.createProduct
  );

// 상품 수정
router
  .route("/products/:id")
  .get(validate(productIdSchema, "params"), productController.getProductById)
  .patch(
    authenticate,
    validate(productIdSchema, "params"),
    validate(updateProductSchema, "body"),
    productController.updateProduct
  )
  .delete(validate(productIdSchema, "params"), productController.deleteProduct);

// 상품 좋아요 토글
router.post(
  "/products/:productId/like",
  authenticate,
  validate(productLikeSchema, "params"),
  likeController.toggleProductLike
);

export default router;
