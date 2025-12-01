import Router from 'express';
import { verifyAccessToken } from '../middlewares/auth.middleware';
import { validateBody, validateParams, validateQuery } from '../middlewares/validator.middleware';
import { getProductsQuerySchema, productSchema } from '../validators/product.validator';
import { idSchema } from '../validators/id.validator';
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from '../controllers/product.controller';

const router = Router();

router.get('/', verifyAccessToken, validateQuery(getProductsQuerySchema), getAllProductsController);

router.get('/:id', verifyAccessToken, validateParams(idSchema), getProductByIdController);

router.post('/', verifyAccessToken, validateBody(productSchema), createProductController);

router.patch(
  '/:id',
  verifyAccessToken,
  validateParams(idSchema),
  validateBody(productSchema),
  updateProductController,
);

router.delete('/:id', verifyAccessToken, validateParams(idSchema), deleteProductController);

export default router;
