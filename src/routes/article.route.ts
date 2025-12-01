import Router from 'express';
import { verifyAccessToken } from '../middlewares/auth.middleware';
import { validateBody, validateParams, validateQuery } from '../middlewares/validator.middleware';
import { articleSchema, getArticlesQuerySchema } from '../validators/article.validator';
import {
  getAllArticlesController,
  createArticleController,
  getArticleByIdController,
  updateArticleController,
  deleteArticleController,
} from '../controllers/article.controller';
import { idSchema } from '../validators/id.validator';

const router = Router();

router.get('/', verifyAccessToken, validateQuery(getArticlesQuerySchema), getAllArticlesController);

router.get('/:id', verifyAccessToken, validateParams(idSchema), getArticleByIdController);

router.post('/', verifyAccessToken, validateBody(articleSchema), createArticleController);

router.patch(
  '/:id',
  verifyAccessToken,
  validateParams(idSchema),
  validateBody(articleSchema),
  updateArticleController,
);

router.delete('/:id', verifyAccessToken, validateParams(idSchema), deleteArticleController);

export default router;
