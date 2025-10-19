import Router from 'express';
import {
  createArticle,
  getArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
} from '../controllers/articleControllers.js';
import * as likeControllers from '../controllers/likeControllers.js';
import passport from '../config/passport.js';
import { verifyArticleOwner } from '../middlewares/ownership.js';
import {
  createArticleValidator,
  updateArticleValidator,
  articleIdValidator,
} from '../middlewares/validate/articleValidator.js';
import { handleValidation } from '../middlewares/validate/index.js';

const router = Router();

router.get('/', getArticle);

router.get('/:id', getArticleById);

router.post(
  '/',
  passport.authenticate('access-token', { session: false }),
  createArticleValidator,
  handleValidation,
  createArticle,
);

router.patch(
  '/:id',
  passport.authenticate('access-token', { session: false }),
  articleIdValidator,
  handleValidation,
  verifyArticleOwner,
  updateArticleValidator,
  handleValidation,
  updateArticle,
);

router.delete(
  '/:id',
  passport.authenticate('access-token', { session: false }),
  articleIdValidator,
  handleValidation,
  verifyArticleOwner,
  deleteArticle,
);

router.post(
  '/:id/like',
  passport.authenticate('access-token', { session: false }),
  likeControllers.likeArticle,
);

router.delete(
  '/:id/like',
  passport.authenticate('access-token', { session: false }),
  likeControllers.unlikeArticle,
);
export default router;
