import Router from 'express';
import passport from '../config/passport.js';
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productControllers.js';
import upload from '../utils/upload.js';
import * as likeControllers from '../controllers/likeControllers.js';
import { verifyProductOwner } from '../middlewares/ownership.js';
import {
  createProductValidator,
  updateProductValidator,
  productIdValidator,
} from '../middlewares/validate/productValidator.js';
import { handleValidation } from '../middlewares/validate/index.js';
const router = Router();

router.get('/', getAllProducts);

router.post(
  '/',
  passport.authenticate('access-token', { session: false }),
  upload.single('image'),
  createProductValidator,
  handleValidation,
  createProduct,
);

router.get('/:id', passport.authenticate('access-token', { session: false }), getProductById);

router.patch(
  '/:id',
  passport.authenticate('access-token', { session: false }),
  productIdValidator,
  handleValidation,
  verifyProductOwner,
  updateProductValidator,
  handleValidation,
  updateProduct,
);

router.delete(
  '/:id',
  passport.authenticate('access-token', { session: false }),
  productIdValidator,
  handleValidation,
  verifyProductOwner,
  deleteProduct,
);

router.post(
  '/:id/like',
  passport.authenticate('access-token', { session: false }),
  likeControllers.likeProduct,
);

router.delete(
  '/:id/like',
  passport.authenticate('access-token', { session: false }),
  likeControllers.unlikeProduct,
);

export default router;
