import * as productRepository from '../repositories/productRepository.js';
import * as articleRepository from '../repositories/articleRepository.js';

export const verifyProductOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productRepository.findByIdForOwner(id);

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

export const verifyArticleOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await articleRepository.findByIdForOwner(id);

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    if (article.ownerId !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: 'You are not the owner of this article' });
    }

    next();
  } catch (error) {
    next(error);
  }
};
