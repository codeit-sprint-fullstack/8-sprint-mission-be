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
import {
  validateCreateProduct,
  validateUpdateProduct,
  validateProductId,
  validatePagination,
} from '../middlewares/validate/validateProductZod.js';
import * as likeControllers from '../controllers/likeControllers.js';

const router = Router();

router.get('/', validatePagination, getAllProducts);
router.post(
  '/',
  passport.authenticate('access-token', { session: false }),
  validateCreateProduct,
  upload.single('image'),
  createProduct,
);
router.get(
  '/:id',
  passport.authenticate('access-token', { session: false }),
  validateProductId,
  getProductById,
);
router.patch('/:id', validateProductId, validateUpdateProduct, updateProduct);
router.delete('/:id', validateProductId, deleteProduct);
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
