import Router from 'express';
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productControllers.js';
import upload from '../utils/upload.js';

const router = Router();

router.get('/', getAllProducts);
router.post('/', upload.single('image'), createProduct);
router.get('/:id', getProductById);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
