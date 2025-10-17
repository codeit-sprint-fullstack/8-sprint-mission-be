import express from 'express';
import { productController } from '../controllers/productController.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import { validateUUID, validateProduct } from '../middlewares/validation.js';

const router = express.Router();

// 상품 목록 조회
router.get('/', asyncHandler(productController.getProducts));

// 상품 단건 조회
router.get(
  '/:id',
  validateUUID,
  asyncHandler(productController.getProductById),
);

// 상품 등록
router.post(
  '/',
  validateProduct,
  asyncHandler(productController.createProduct),
);

// 상품 수정
router.patch(
  '/:id',
  validateUUID,
  asyncHandler(productController.updateProduct),
);

// 상품 삭제
router.delete(
  '/:id',
  validateUUID,
  asyncHandler(productController.deleteProduct),
);

export default router;
