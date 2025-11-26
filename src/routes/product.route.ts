import Router from 'express';
import { verifyAccessToken } from '../middlewares/auth.middleware';
import { validateQuery } from '../middlewares/validator.middleware';
import { getProductsQuerySchema } from '../validators/product.validator';
import { getAllProductsController } from '../controllers/product.controller';

const router = Router();

// router.get에 제네릭 타입을 명시하여 모든 핸들러가 동일한 ReqQuery 타입을 사용하도록 함
router.get('/', verifyAccessToken, validateQuery(getProductsQuerySchema), getAllProductsController);

export default router;
