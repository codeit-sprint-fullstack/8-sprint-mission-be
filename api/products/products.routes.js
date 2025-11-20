import { Router } from 'express';
import { asyncHandeler } from '../../utils/errorHandler.js';
import { verifyAccessToken } from '../../middlewares/authGuard.js';
import {
  getProductList,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  checkOwner,
  addFavorite,
} from './products.controller.js';
const router = Router();

/* === 상품 api === */
router.get('', asyncHandeler(getProductList));
router.get('/:id', asyncHandeler(getProduct));

//로그인한 유저(verifyAccessToken), 소유권이 있는 유저(checkOwner)
router.post('', verifyAccessToken, asyncHandeler(createProduct));
router.patch('/:id', verifyAccessToken, checkOwner, asyncHandeler(updateProduct));
router.delete('/:id', verifyAccessToken, checkOwner, asyncHandeler(deleteProduct));
router.patch('/:id/favorite', verifyAccessToken, asyncHandeler(addFavorite));
router.post('/:id/checkOwner', verifyAccessToken, checkOwner, async (req, res) => {
  res.status(200).json({ owner: true });
});

export default router;
