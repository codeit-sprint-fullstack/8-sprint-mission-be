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

const router = Router();

router.get('/', validatePagination, getAllProducts);
router.post(
  '/',
  passport.authenticate('access-token', { session: false }),
  validateCreateProduct,
  upload.single('image'),
  createProduct,
);
router.get('/:id', validateProductId, getProductById);
router.patch('/:id', validateProductId, validateUpdateProduct, updateProduct);
router.delete('/:id', validateProductId, deleteProduct);

export default router;
