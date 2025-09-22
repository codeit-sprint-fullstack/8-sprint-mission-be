import Router from 'express';
import {
  createArticle,
  getArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
} from '../controllers/articleControllers.js';

const router = Router();

router.get('/', getArticle);
router.get('/:id', getArticleById);
router.post('/', createArticle);
router.patch('/:id', updateArticle);
router.delete('/:id', deleteArticle);

export default router;
