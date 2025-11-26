import Router from 'express';
import { verifyAccessToken } from '../middlewares/auth.middleware';
import { validateBody, validateParams, validateQuery } from '../middlewares/validator.middleware';
import {
  getProductsQuerySchema,
  productIdSchema,
  productSchema,
} from '../validators/product.validator';
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from '../controllers/product.controller';

const router = Router();

router.get('/', verifyAccessToken, validateQuery(getProductsQuerySchema), getAllProductsController);

router.get('/:id', verifyAccessToken, validateParams(productIdSchema), getProductByIdController);

router.post('/', verifyAccessToken, validateBody(productSchema), createProductController);

router.patch(
  '/:id',
  verifyAccessToken,
  validateParams(productIdSchema),
  validateBody(productSchema),
  updateProductController,
);

export default router;
