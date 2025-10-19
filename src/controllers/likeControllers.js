import * as likeRepository from '../repositories/likeRepository.js';

export const likeProduct = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const result = await likeRepository.addProductLike(userId, productId);

    res.status(201).json({ success: true, message: 'Product liked successfully' });
  } catch (error) {
    next(error);
  }
};

export const unlikeProduct = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const result = await likeRepository.removeProductLike(userId, productId);

    res.status(200).json({ success: true, message: 'Product unliked successfully' });
  } catch (error) {
    next(error);
  }
};

export const likeArticle = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { articleId } = req.params;

    const result = await likeRepository.addArticleLike(userId, articleId);

    res.status(201).json({ success: true, message: 'Article liked successfully' });
  } catch (error) {
    next(error);
  }
};

export const unlikeArticle = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { articleId } = req.params;

    const result = await likeRepository.removeArticleLike(userId, articleId);

    res.status(200).json({ success: true, message: 'Article unliked successfully' });
  } catch (error) {
    next(error);
  }
};
