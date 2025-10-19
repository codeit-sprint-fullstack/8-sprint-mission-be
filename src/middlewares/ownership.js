import * as productRepository from '../repositories/productRepository.js';

export const verifyProductOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productRepository.getProductById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.ownerId !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: 'You are not the owner of this product' });
    }

    next();
  } catch (error) {
    next(error);
  }
};
