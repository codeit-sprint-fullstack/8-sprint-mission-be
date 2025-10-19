import * as likeRepository from '../repositories/likeRepository.js';

export const likeProduct = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const result = await likeRepository.addProductLike(userId, id);

    res.status(201).json({ success: true, message: 'Product liked successfully' });
  } catch (error) {
    next(error);
  }
};

export const unlikeProduct = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const result = await likeRepository.removeProductLike(userId, id);

    res.status(200).json({ success: true, message: 'Product unliked successfully' });
  } catch (error) {
    next(error);
  }
};

export const likeArticle = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const result = await likeRepository.addArticleLike(userId, id);

    res.status(201).json({ success: true, message: 'Article liked successfully' });
  } catch (error) {
    next(error);
  }
};

export const unlikeArticle = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const result = await likeRepository.removeArticleLike(userId, id);

    res.status(200).json({ success: true, message: 'Article unliked successfully' });
  } catch (error) {
    next(error);
  }
};
