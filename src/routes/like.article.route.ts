import Router from 'express';
import { verifyAccessToken } from '../middlewares/auth.middleware';
import { validateParams } from '../middlewares/validator.middleware';
import { idSchema } from '../validators/id.validator';
import { articleLikeController, articleUnlikeController } from '../controllers/like.controller';

const router = Router();

router.post('/:id/like', verifyAccessToken, validateParams(idSchema), articleLikeController);
router.delete('/:id/like', verifyAccessToken, validateParams(idSchema), articleUnlikeController);

export default router;
