import Router from 'express';
import {
  createArticle,
  getArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
} from '../controllers/articleControllers.js';
import * as likeControllers from '../controllers/likeControllers.js';

const router = Router();

router.get('/', getArticle);
router.get('/:id', getArticleById);
router.post('/', createArticle);
router.patch('/:id', updateArticle);
router.delete('/:id', deleteArticle);
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
