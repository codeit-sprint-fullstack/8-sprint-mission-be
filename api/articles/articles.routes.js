import { Router } from 'express';
import { asyncHandeler } from '../../utils/errorHandler.js';
import { verifyAccessToken } from '../../middlewares/authGuard.js';
import {
  getArticleList,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  checkOwner,
} from './articles.controller.js';

const router = Router();

/* === 게시글 api === */
router.get('', asyncHandeler(getArticleList));
router.get('/:id', asyncHandeler(getArticle));

//로그인한 유저(verifyAccessToken), 소유권이 있는 유저(checkOwner)
router.post('', verifyAccessToken, asyncHandeler(createArticle));
router.patch('/:id', verifyAccessToken, checkOwner, asyncHandeler(updateArticle));
router.delete('/:id', verifyAccessToken, checkOwner, asyncHandeler(deleteArticle));
router.post('/:id/checkOwner', verifyAccessToken, checkOwner, async (req, res) => {
  res.status(200).json({ owner: true });
});

export default router;
