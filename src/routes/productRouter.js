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

const router = Router();

router.get('/', getAllProducts);

router.post(
  '/',
  passport.authenticate('access-token', { session: false }),
  upload.single('image'),
  createProduct,
);

router.get('/:id', passport.authenticate('access-token', { session: false }), getProductById);

router.patch(
  '/:id',
  passport.authenticate('access-token', { session: false }),
  verifyProductOwner,
  updateProduct,
);

router.delete(
  '/:id',
  passport.authenticate('access-token', { session: false }),
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
