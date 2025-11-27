import Router from 'express';
import { verifyAccessToken } from '../middlewares/auth.middleware';
import { validateBody, validateParams } from '../middlewares/validator.middleware';
import { idSchema } from '../validators/id.validator';
import {
  createArticleCommentController,
  deleteArticleCommentController,
  getArticleCommentController,
  updateArticleCommentController,
} from '../controllers/article.comment.controller';
import { commentBodySchema } from '../validators/comment.validator';

const router = Router();

router.get('/:id', verifyAccessToken, validateParams(idSchema), getArticleCommentController);

router.post(
  '/:id',
  verifyAccessToken,
  validateParams(idSchema),
  validateBody(commentBodySchema),
  createArticleCommentController,
);

router.patch(
  '/:commentId',
  verifyAccessToken,
  validateParams(idSchema),
  validateBody(commentBodySchema),
  updateArticleCommentController,
);

router.delete(
  '/:commentId',
  verifyAccessToken,
  validateParams(idSchema),
  deleteArticleCommentController,
);

export default router;
