import Router from 'express';
import passport from '../config/passport.js';
import * as articleCommentControllers from '../controllers/articleCommentControllers.js';
import * as commentValidator from '../middlewares/validate/commentValidator.js';
import { handleValidation } from '../middlewares/validate/index.js';
import { verifyArticleCommentOwner } from '../middlewares/ownership.js';
import { articleIdValidator } from '../middlewares/validate/articleValidator.js';

const router = Router();

router.post(
  '/:articleId',
  passport.authenticate('access-token', { session: false }),
  articleIdValidator,
  handleValidation,
  commentValidator.createCommentValidator,
  handleValidation,
  articleCommentControllers.createArticleComment,
);

router.patch(
  '/:commentId',
  passport.authenticate('access-token', { session: false }),
  commentValidator.commentIdValidator,
  handleValidation,
  commentValidator.updateCommentValidator,
  handleValidation,
  verifyArticleCommentOwner,
  articleCommentControllers.updateArticleComment,
);

router.delete(
  '/:commentId',
  passport.authenticate('access-token', { session: false }),
  commentValidator.commentIdValidator,
  handleValidation,
  verifyArticleCommentOwner,
  articleCommentControllers.deleteArticleComment,
);

export default router;
