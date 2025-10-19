import Router from 'express';
import { getCommentByProduct } from '../controllers/commentControllers.js';
import * as commentValidator from '../middlewares/validate/commentValidator.js';
import { handleValidation } from '../middlewares/validate/index.js';
import * as productCommentControllers from '../controllers/productCommentControllers.js';
import passport from '../config/passport.js';
import { productIdValidator } from '../middlewares/validate/productValidator.js';
import { verifyProductCommentOwner } from '../middlewares/ownership.js';

const router = Router();

router.get('/:id', commentValidator.commentIdValidator, handleValidation, getCommentByProduct);

router.post(
  '/:productId',
  passport.authenticate('access-token', { session: false }),
  productIdValidator,
  handleValidation,
  commentValidator.createCommentValidator,
  handleValidation,
  productCommentControllers.createProductComment,
);

router.patch(
  '/:commentId',
  passport.authenticate('access-token', { session: false }),
  commentValidator.commentIdValidator,
  handleValidation,
  commentValidator.updateCommentValidator,
  handleValidation,
  verifyProductCommentOwner,
  productCommentControllers.updateProductComment,
);

router.delete(
  '/:commentId',
  passport.authenticate('access-token', { session: false }),
  commentValidator.commentIdValidator,
  handleValidation,
  verifyProductCommentOwner,
  productCommentControllers.deleteProductComment,
);

export default router;
