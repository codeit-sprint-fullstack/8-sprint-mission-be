import Router from 'express';
import { verifyAccessToken } from '../middlewares/auth.middleware';
import { validateParams } from '../middlewares/validator.middleware';
import { idSchema } from '../validators/id.validator';
import { productLikeController, productUnlikeController } from '../controllers/like.controller';

const router = Router();

router.post('/:id/like', verifyAccessToken, validateParams(idSchema), productLikeController);
router.delete('/:id/like', verifyAccessToken, validateParams(idSchema), productUnlikeController);

export default router;
