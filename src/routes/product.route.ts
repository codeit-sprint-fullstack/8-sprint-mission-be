import Router from 'express';
import { verifyAccessToken } from '../middlewares/auth.middleware';
import { validateBody, validateQuery } from '../middlewares/validator.middleware';
import { createProductSchema, getProductsQuerySchema } from '../validators/product.validator';
import {
  createProductController,
  getAllProductsController,
} from '../controllers/product.controller';

const router = Router();

router.get('/', verifyAccessToken, validateQuery(getProductsQuerySchema), getAllProductsController);

router.post('/', verifyAccessToken, validateBody(createProductSchema), createProductController);

export default router;
