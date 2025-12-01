import Router from 'express';
import { verifyAccessToken } from '../middlewares/auth.middleware';
import { validateBody, validateParams } from '../middlewares/validator.middleware';
import { idSchema } from '../validators/id.validator';
import {
  createProductCommentController,
  deleteProductCommentController,
  getProductCommentController,
  updateProductCommentController,
} from '../controllers/product.comment.controller';
import { commentBodySchema } from '../validators/comment.validator';

const router = Router();

router.get('/:id', verifyAccessToken, validateParams(idSchema), getProductCommentController);

router.post(
  '/:id',
  verifyAccessToken,
  validateParams(idSchema),
  validateBody(commentBodySchema),
  createProductCommentController,
);

router.patch(
  '/:commentId',
  verifyAccessToken,
  validateParams(idSchema),
  validateBody(commentBodySchema),
  updateProductCommentController,
);

router.delete(
  '/:commentId',
  verifyAccessToken,
  validateParams(idSchema),
  deleteProductCommentController,
);

export default router;
